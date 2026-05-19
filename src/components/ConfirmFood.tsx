'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Food } from '@/lib/types';
import { addEntry } from '@/lib/storage';

type Props = {
  food: Food;
  onCancel: () => void;
};

export function ConfirmFood({ food, onCancel }: Props) {
  const router = useRouter();
  const [grams, setGrams] = useState(food.servingGrams ?? 100);
  const [servings, setServings] = useState(1);

  const totalGrams = food.servingGrams ? food.servingGrams * servings : grams;
  const proteinG = (food.proteinPer100g * totalGrams) / 100;
  const kcal = (food.caloriesPer100g * totalGrams) / 100;

  const useServings = !!food.servingGrams;

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
        {useServings ? (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                Porções (1 porção = {food.servingGrams} g)
              </span>
              <div className="flex gap-2">
                {[0.5, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setServings(n)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium ${
                      servings === n
                        ? 'bg-[var(--orange)] text-black'
                        : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {n === 0.5 ? '½' : n}
                  </button>
                ))}
              </div>
              <input
                type="number"
                inputMode="decimal"
                step={0.5}
                min={0.5}
                value={servings}
                onChange={(e) => setServings(Math.max(0.1, Number(e.target.value) || 0.1))}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-base font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)]"
              />
            </label>
          </>
        ) : (
          <label className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Quantidade (gramas)</span>
            <input
              type="number"
              inputMode="numeric"
              step={5}
              min={1}
              value={grams}
              onChange={(e) => setGrams(Math.max(1, Number(e.target.value) || 1))}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)]"
            />
            <div className="flex gap-2">
              {[50, 100, 150, 200].map((n) => (
                <button
                  key={n}
                  onClick={() => setGrams(n)}
                  className="flex-1 py-1.5 rounded-lg text-xs bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]"
                >
                  {n} g
                </button>
              ))}
            </div>
          </label>
        )}

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
          className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[var(--orange)] text-black font-semibold"
        >
          <Check className="w-5 h-5" strokeWidth={2.5} /> Adicionar
        </button>
      </div>
    </div>
  );
}
