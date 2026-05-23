'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Food } from '@/lib/types';
import { addEntry } from '@/lib/storage';

type Props = {
  food: Food;
  onCancel: () => void;
  initialGrams?: number;
};

export function ConfirmFood({ food, onCancel, initialGrams }: Props) {
  const router = useRouter();
  const defaultGrams = initialGrams ?? food.servingGrams ?? 100;
  const [grams, setGrams] = useState<number>(defaultGrams);

  const totalGrams = Math.max(0, grams);
  const proteinG = (food.proteinPer100g * totalGrams) / 100;
  const kcal = (food.caloriesPer100g * totalGrams) / 100;

  const servingGrams = food.servingGrams;
  const servingShortcuts = servingGrams
    ? [
        { label: '½', g: Math.round(servingGrams * 0.5) },
        { label: '1', g: servingGrams },
        { label: '2', g: servingGrams * 2 },
        { label: '3', g: servingGrams * 3 },
      ]
    : [];
  const gramShortcuts = servingGrams ? [10, 20, 50, 100] : [50, 100, 150, 200];

  function handleAdd() {
    addEntry(food, totalGrams);
    router.push('/');
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{food.category}</div>
        <div className="text-lg font-semibold mt-1">{food.name}</div>
        {food.brand && <div className="text-sm text-[var(--text-muted)] mt-0.5">{food.brand}</div>}
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-4">
        {servingGrams && (
          <div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Porção padrão = {servingGrams} g
            </div>
            <div className="flex gap-2">
              {servingShortcuts.map(({ label, g }) => (
                <button
                  key={label}
                  onClick={() => setGrams(g)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium ${
                    Math.round(grams) === Math.round(g)
                      ? 'bg-[var(--orange)] text-black'
                      : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <div>{label}</div>
                  <div className="text-[10px] opacity-70 font-normal">{Math.round(g)} g</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Peso consumido (gramas)
          </span>
          <input
            type="number"
            inputMode="numeric"
            step={1}
            min={0}
            value={grams === 0 ? '' : grams}
            onChange={(e) => setGrams(e.target.value === '' ? 0 : Number(e.target.value))}
            onBlur={() => setGrams((g) => Math.max(1, g || 1))}
            className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)]"
          />
          <div className="flex gap-2">
            {gramShortcuts.map((n) => (
              <button
                key={n}
                onClick={() => setGrams(n)}
                className={`flex-1 py-1.5 rounded-lg text-xs ${
                  Math.round(grams) === n
                    ? 'bg-[var(--orange)]/20 border border-[var(--orange)] text-[var(--orange-bright)]'
                    : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {n} g
              </button>
            ))}
          </div>
        </label>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--border)]">
          <div className="text-center">
            <div className="text-xs text-[var(--text-dim)] uppercase">Peso</div>
            <div className="text-base font-semibold tabular-nums mt-0.5">{Math.round(totalGrams)} g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--text-dim)] uppercase">Proteína</div>
            <div className="text-base font-semibold text-[var(--orange-bright)] tabular-nums mt-0.5">
              {proteinG.toFixed(1)} g
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--text-dim)] uppercase">Calorias</div>
            <div className="text-base font-semibold tabular-nums mt-0.5">{Math.round(kcal)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] font-medium"
        >
          <X className="w-4 h-4" /> Cancelar
        </button>
        <button
          onClick={handleAdd}
          disabled={totalGrams <= 0}
          className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[var(--orange)] text-black font-semibold disabled:opacity-50"
        >
          <Check className="w-5 h-5" strokeWidth={2.5} /> Adicionar
        </button>
      </div>
    </div>
  );
}
