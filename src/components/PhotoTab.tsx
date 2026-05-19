'use client';

import { useRef, useState } from 'react';
import { Camera, Loader2, AlertCircle } from 'lucide-react';
import { Food } from '@/lib/types';
import { ConfirmFood } from './ConfirmFood';
import { logApiSpend } from '@/lib/storage';
import { budgetState } from '@/lib/cost';
import { useAppData } from '@/lib/useAppData';
import { centsToUSD } from '@/lib/format';

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'found'; food: Food; previewUrl: string }
  | { kind: 'error'; message: string };

export function PhotoTab() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useAppData();
  const bState = budgetState(data.apiSpend.totalCents, data.apiSpend.capCents);

  async function handleFile(file: File) {
    setState({ kind: 'loading' });
    try {
      const previewUrl = URL.createObjectURL(file);
      const dataUrl = await fileToBase64(file);

      const res = await fetch('/api/analisar-foto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: dataUrl }),
      });

      const json = await res.json();
      if (!res.ok) {
        setState({ kind: 'error', message: json.error || 'Erro desconhecido.' });
        return;
      }

      if (typeof json.estimatedCents === 'number') {
        logApiSpend(json.estimatedCents, 'photo');
      }

      const food: Food = {
        id: `photo-${Date.now()}`,
        source: 'photo',
        name: json.name,
        category: json.category || 'Foto',
        proteinPer100g: json.proteinPer100g,
        caloriesPer100g: json.caloriesPer100g,
        carbsPer100g: json.carbsPer100g,
        fatPer100g: json.fatPer100g,
        servingGrams: json.estimatedServingGrams,
      };

      setState({ kind: 'found', food, previewUrl });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }

  if (state.kind === 'found') {
    return (
      <div className="flex flex-col gap-4">
        {state.previewUrl && (
          <div className="w-full aspect-square overflow-hidden rounded-2xl border border-[var(--border)]">
            <img src={state.previewUrl} alt="Foto" className="w-full h-full object-cover" />
          </div>
        )}
        <ConfirmFood
          food={state.food}
          onCancel={() => {
            URL.revokeObjectURL(state.previewUrl);
            setState({ kind: 'idle' });
          }}
        />
      </div>
    );
  }

  if (state.kind === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-[var(--text-muted)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
        <div className="text-sm">Analisando foto com Claude…</div>
        <div className="text-xs">(custo estimado: menos de 1 centavo)</div>
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

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 h-32 rounded-2xl bg-[var(--bg-card)] border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
      >
        <Camera className="w-6 h-6" />
        <span className="font-medium">Tirar foto do alimento</span>
      </button>

      <div
        className={`text-xs rounded-xl px-3 py-2 ${
          bState === 'critical'
            ? 'bg-[var(--red)]/15 text-[var(--red)]'
            : bState === 'warn'
              ? 'bg-[var(--warn)]/15 text-[var(--warn)]'
              : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
        }`}
      >
        Saldo de IA: {centsToUSD(data.apiSpend.totalCents)} de {centsToUSD(data.apiSpend.capCents)} usados.
      </div>
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}
