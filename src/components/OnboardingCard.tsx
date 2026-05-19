'use client';

import { useState } from 'react';

type Props = {
  onDone: (goalG: number) => void;
};

export function OnboardingCard({ onDone }: Props) {
  const [weight, setWeight] = useState(80);
  const [intensity, setIntensity] = useState<'low' | 'mid' | 'high'>('mid');

  const multiplier = intensity === 'low' ? 1.2 : intensity === 'mid' ? 1.6 : 2.0;
  const safeWeight = Math.max(30, Math.min(200, weight || 80));
  const goal = Math.round(safeWeight * multiplier);

  return (
    <div className="mx-auto max-w-md px-5 pt-10 pb-12 flex flex-col gap-6">
      <div>
        <div className="inline-block px-2 py-0.5 rounded-full bg-[var(--orange)]/20 text-[var(--orange-bright)] text-xs font-medium mb-3">
          Bem-vindo
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Vamos definir sua meta diária de proteína</h1>
        <p className="text-[var(--text-muted)] mt-2 text-sm leading-relaxed">
          A recomendação é entre 1,2 g e 2,0 g de proteína por quilo de peso corporal, dependendo do seu objetivo.
        </p>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Seu peso (kg)</span>
          <input
            type="number"
            inputMode="numeric"
            value={weight === 0 ? '' : weight}
            onChange={(e) => setWeight(e.target.value === '' ? 0 : Number(e.target.value))}
            onBlur={() => setWeight(safeWeight)}
            className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)]"
          />
        </label>

        <div>
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Objetivo</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: 'low' as const, l: 'Manutenção', sub: '1,2 g/kg' },
              { v: 'mid' as const, l: 'Emagrecer', sub: '1,6 g/kg' },
              { v: 'high' as const, l: 'Ganhar massa', sub: '2,0 g/kg' },
            ].map((opt) => (
              <button
                key={opt.v}
                onClick={() => setIntensity(opt.v)}
                className={`p-3 rounded-xl text-xs font-medium transition-colors ${
                  intensity === opt.v
                    ? 'bg-[var(--orange)] text-black'
                    : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                <div>{opt.l}</div>
                <div className="opacity-70 mt-1 font-normal">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Sua meta</div>
          <div className="text-3xl font-bold text-[var(--orange-bright)] tabular-nums mt-1">{goal} g</div>
          <div className="text-xs text-[var(--text-dim)] mt-1">de proteína por dia</div>
        </div>
      </div>

      <button
        onClick={() => {
          setWeight(safeWeight);
          onDone(goal);
        }}
        className="w-full h-14 rounded-2xl bg-[var(--orange)] text-black font-semibold text-base active:bg-[var(--orange-bright)]"
      >
        Começar
      </button>
    </div>
  );
}
