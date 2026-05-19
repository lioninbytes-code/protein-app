'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, AlertCircle, Keyboard } from 'lucide-react';
import { Food } from '@/lib/types';
import { ConfirmFood } from './ConfirmFood';

type State =
  | { kind: 'idle' }
  | { kind: 'scanning' }
  | { kind: 'loading'; code: string }
  | { kind: 'found'; food: Food }
  | { kind: 'manual' }
  | { kind: 'error'; message: string };

export function BarcodeTab() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [manualCode, setManualCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (state.kind !== 'scanning') return;

    let cancelled = false;

    (async () => {
      try {
        const { BrowserMultiFormatReader } = await import('@zxing/browser');
        const reader = new BrowserMultiFormatReader();
        const controls = await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result) => {
            if (cancelled || !result) return;
            const code = result.getText();
            controls.stop();
            fetchOpenFoodFacts(code).then((food) => {
              if (cancelled) return;
              if (food) setState({ kind: 'found', food });
              else setState({ kind: 'error', message: `Produto ${code} não encontrado no Open Food Facts.` });
            });
            setState({ kind: 'loading', code });
          }
        );
        controlsRef.current = controls;
      } catch (e) {
        if (!cancelled) setState({ kind: 'error', message: (e as Error).message });
      }
    })();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
  }, [state.kind]);

  if (state.kind === 'found') {
    return <ConfirmFood food={state.food} onCancel={() => setState({ kind: 'idle' })} />;
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
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="7891000..."
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-3 text-base focus:outline-none focus:border-[var(--orange)]"
          />
        </label>
        <button
          disabled={!manualCode}
          onClick={async () => {
            setState({ kind: 'loading', code: manualCode });
            const food = await fetchOpenFoodFacts(manualCode);
            if (food) setState({ kind: 'found', food });
            else setState({ kind: 'error', message: `Produto ${manualCode} não encontrado.` });
          }}
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

  if (state.kind === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-[var(--text-muted)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
        <div className="text-sm">Buscando código {state.code}…</div>
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
          Aponte para o código de barras do produto.
        </p>
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
      <p className="text-xs text-center text-[var(--text-dim)] mt-1">
        Funciona com qualquer produto cadastrado no <span className="text-[var(--orange)]">Open Food Facts</span> (gratuito).
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
