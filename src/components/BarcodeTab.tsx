'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, AlertCircle, Keyboard, RefreshCw, Sparkles, Database } from 'lucide-react';
import { Food } from '@/lib/types';
import { ConfirmFood } from './ConfirmFood';
import { addCustomFood, findCustomFood, logApiSpend } from '@/lib/storage';
import { useAppData } from '@/lib/useAppData';
import { budgetState } from '@/lib/cost';
import { centsToUSD } from '@/lib/format';

type State =
  | { kind: 'idle' }
  | { kind: 'scanning' }
  | { kind: 'loading-off'; code: string }
  | { kind: 'not-in-off'; code: string }
  | { kind: 'searching-claude'; code: string }
  | { kind: 'found'; food: Food; fromCache?: boolean; foundVia?: 'cache' | 'off' | 'claude' }
  | { kind: 'manual' }
  | { kind: 'error'; message: string };

export function BarcodeTab() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [manualCode, setManualCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const { data } = useAppData();

  const photoOrSearchAllowed =
    data.prefs.photoEnabled && data.apiSpend.totalCents < data.apiSpend.capCents;
  const bState = budgetState(data.apiSpend.totalCents, data.apiSpend.capCents);

  async function lookupCode(code: string) {
    // 1. Local cache
    const cached = findCustomFood(`barcode-${code}`);
    if (cached) {
      setState({ kind: 'found', food: cached, fromCache: true, foundVia: 'cache' });
      return;
    }

    // 2. Open Food Facts
    setState({ kind: 'loading-off', code });
    const off = await fetchOpenFoodFacts(code);
    if (off) {
      addCustomFood(off);
      setState({ kind: 'found', food: off, foundVia: 'off' });
      return;
    }

    setState({ kind: 'not-in-off', code });
  }

  async function searchWithClaude(code: string) {
    setState({ kind: 'searching-claude', code });
    try {
      const res = await fetch('/api/buscar-produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const json = await res.json();

      if (typeof json.estimatedCents === 'number') {
        logApiSpend(json.estimatedCents, 'photo');
      }

      if (!res.ok || json.error) {
        setState({ kind: 'error', message: json.error || `Erro ${res.status}` });
        return;
      }

      const food: Food = {
        id: `barcode-${code}`,
        source: 'barcode',
        name: json.name,
        brand: json.brand,
        category: json.category || 'Industrializado',
        proteinPer100g: json.proteinPer100g,
        caloriesPer100g: json.caloriesPer100g,
        carbsPer100g: json.carbsPer100g,
        fatPer100g: json.fatPer100g,
        servingGrams: json.servingGrams,
      };

      addCustomFood(food);
      setState({ kind: 'found', food, foundVia: 'claude' });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }

  useEffect(() => {
    if (state.kind !== 'scanning') return;

    let cancelled = false;

    (async () => {
      try {
        const { BrowserMultiFormatReader } = await import('@zxing/browser');
        const reader = new BrowserMultiFormatReader();

        const constraints: MediaStreamConstraints = {
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        };

        const controls = await reader.decodeFromConstraints(
          constraints,
          videoRef.current!,
          (result) => {
            if (cancelled || !result) return;
            const code = result.getText();
            controls.stop();
            lookupCode(code);
          }
        );
        controlsRef.current = controls;
      } catch (e) {
        if (cancelled) return;
        const err = e as Error;
        const msg = err.name === 'NotAllowedError'
          ? 'Permissão da câmera foi negada. Vai em Ajustes do iPhone → Safari → Câmera e libera o acesso.'
          : err.name === 'NotFoundError'
            ? 'Câmera traseira não encontrada neste dispositivo.'
            : err.message || 'Erro ao abrir câmera.';
        setState({ kind: 'error', message: msg });
      }
    })();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.kind]);

  if (state.kind === 'found') {
    return (
      <div className="flex flex-col gap-3">
        {state.foundVia === 'cache' && (
          <div className="flex items-center gap-2 text-xs text-[var(--green)] bg-[var(--green)]/10 px-3 py-2 rounded-xl">
            <Database className="w-4 h-4" />
            Encontrado no cache local (zero gasto de API)
          </div>
        )}
        {state.foundVia === 'claude' && (
          <div className="flex items-center gap-2 text-xs text-[var(--orange)] bg-[var(--orange)]/10 px-3 py-2 rounded-xl">
            <Sparkles className="w-4 h-4" />
            Encontrado via Claude (salvo no cache pra próxima vez)
          </div>
        )}
        <ConfirmFood food={state.food} onCancel={() => setState({ kind: 'idle' })} />
      </div>
    );
  }

  if (state.kind === 'not-in-off') {
    const canSearchClaude = photoOrSearchAllowed && bState !== 'exceeded';
    return (
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <AlertCircle className="w-10 h-10 text-[var(--warn)]" />
        <div>
          <p className="text-base font-medium">Código lido</p>
          <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">{state.code}</p>
          <p className="text-sm text-[var(--text-muted)] mt-3 max-w-xs">
            Mas esse produto não está no Open Food Facts. Posso pedir pro Claude buscar na internet?
          </p>
        </div>
        {canSearchClaude ? (
          <button
            onClick={() => searchWithClaude(state.code)}
            className="flex items-center justify-center gap-2 w-full max-w-xs h-12 rounded-2xl bg-[var(--orange)] text-black font-semibold"
          >
            <Sparkles className="w-5 h-5" />
            Buscar via Claude (~1¢)
          </button>
        ) : (
          <div className="text-xs text-[var(--red)] max-w-xs">
            Saldo de IA esgotado ou análise por foto desligada. Você pode reativar em Ajustes.
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setState({ kind: 'scanning' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Outro código
          </button>
          <button
            onClick={() => setState({ kind: 'idle' })}
            className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-muted)]"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (state.kind === 'searching-claude') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-[var(--text-muted)]">
        <Sparkles className="w-8 h-8 text-[var(--orange)] animate-pulse" />
        <div className="text-sm">Claude pesquisando na internet…</div>
        <div className="text-xs">Código {state.code}</div>
        <div className="text-xs text-[var(--text-dim)] max-w-xs text-center mt-2">
          Pode levar 10-20 segundos. Saldo atual: {centsToUSD(data.apiSpend.totalCents)} / {centsToUSD(data.apiSpend.capCents)}
        </div>
      </div>
    );
  }

  if (state.kind === 'manual') {
    return (
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Código de barras</span>
          <input
            type="text"
            inputMode="numeric"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value.replace(/\D/g, ''))}
            placeholder="7891000..."
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-3 text-base focus:outline-none focus:border-[var(--orange)]"
          />
        </label>
        <button
          disabled={!manualCode}
          onClick={() => lookupCode(manualCode)}
          className="h-12 rounded-2xl bg-[var(--orange)] text-black font-semibold"
        >
          Buscar
        </button>
        <button onClick={() => setState({ kind: 'idle' })} className="text-sm text-[var(--text-muted)]">
          Voltar
        </button>
      </div>
    );
  }

  if (state.kind === 'loading-off') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-[var(--text-muted)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
        <div className="text-sm">Buscando código {state.code} no Open Food Facts…</div>
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <AlertCircle className="w-10 h-10 text-[var(--red)]" />
        <p className="text-sm text-[var(--text-muted)] max-w-xs">{state.message}</p>
        <button
          onClick={() => setState({ kind: 'idle' })}
          className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (state.kind === 'scanning') {
    return (
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-black">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-1/3 border-2 border-[var(--orange)] rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
          </div>
        </div>
        <p className="text-sm text-center text-[var(--text-muted)]">
          Encaixe o código de barras dentro do quadrado laranja.
        </p>
        <p className="text-xs text-center text-[var(--text-dim)]">
          Dica: ilumine bem e mantenha cerca de 10–15 cm de distância.
        </p>
        <button
          onClick={() => setState({ kind: 'manual' })}
          className="flex items-center justify-center gap-2 py-2 text-sm text-[var(--text-muted)]"
        >
          <Keyboard className="w-4 h-4" /> Digitar manualmente
        </button>
        <button
          onClick={() => setState({ kind: 'idle' })}
          className="text-sm text-[var(--text-muted)]"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setState({ kind: 'scanning' })}
        className="flex items-center justify-center gap-2 h-32 rounded-2xl bg-[var(--bg-card)] border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
      >
        <Camera className="w-6 h-6" />
        <span className="font-medium">Abrir câmera pra escanear</span>
      </button>
      <button
        onClick={() => setState({ kind: 'manual' })}
        className="flex items-center justify-center gap-2 py-2.5 text-sm text-[var(--text-muted)]"
      >
        <Keyboard className="w-4 h-4" />
        Digitar código manualmente
      </button>
      {data.customFoods.filter((f) => f.source === 'barcode').length > 0 && (
        <p className="text-xs text-center text-[var(--text-dim)] mt-1 flex items-center justify-center gap-1">
          <Database className="w-3 h-3" />
          {data.customFoods.filter((f) => f.source === 'barcode').length} produtos no seu cache local
        </p>
      )}
      <p className="text-xs text-center text-[var(--text-dim)] mt-1">
        1º tentamos no <span className="text-[var(--orange)]">Open Food Facts</span> (grátis). Se não tiver, ofereço busca via Claude.
      </p>
    </div>
  );
}

async function fetchOpenFoodFacts(code: string): Promise<Food | null> {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    const p = data.product;
    const n = p.nutriments || {};

    const proteinPer100g = Number(n['proteins_100g']) || 0;
    const caloriesPer100g = Number(n['energy-kcal_100g']) || Number(n['energy-kcal']) || 0;
    if (proteinPer100g === 0 && caloriesPer100g === 0) return null;

    const servingSize = p.serving_size as string | undefined;
    let servingGrams: number | undefined;
    if (servingSize) {
      const match = servingSize.match(/(\d+(?:[.,]\d+)?)\s*g/i);
      if (match) servingGrams = parseFloat(match[1].replace(',', '.'));
    }

    return {
      id: `barcode-${code}`,
      source: 'barcode',
      name: (p.product_name_pt || p.product_name || `Produto ${code}`).slice(0, 80),
      brand: p.brands as string | undefined,
      category: 'Industrializado',
      proteinPer100g,
      caloriesPer100g,
      carbsPer100g: Number(n['carbohydrates_100g']) || undefined,
      fatPer100g: Number(n['fat_100g']) || undefined,
      servingGrams,
    };
  } catch {
    return null;
  }
}
