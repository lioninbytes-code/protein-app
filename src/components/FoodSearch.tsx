'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { searchFoods, allFoods } from '@/lib/taco';
import { Food } from '@/lib/types';
import { ConfirmFood } from './ConfirmFood';
import { useAppData } from '@/lib/useAppData';

export function FoodSearch() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Food | null>(null);
  const { data } = useAppData();

  const results = useMemo(
    () => searchFoods(query, allFoods(data.customFoods)),
    [query, data.customFoods],
  );

  if (selected) {
    return <ConfirmFood food={selected} onCancel={() => setSelected(null)} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-dim)]" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: frango, ovo, whey…"
          className="w-full pl-11 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl text-base focus:outline-none focus:border-[var(--orange)]"
        />
      </label>

      {query.length === 0 && (
        <div className="text-sm text-[var(--text-dim)] text-center pt-6">
          Digite o nome de um alimento pra ver as opções.
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {results.map((f) => (
          <li key={f.id}>
            <button
              onClick={() => setSelected(f)}
              className="w-full text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 active:bg-[var(--bg-elevated)] transition-colors"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium truncate">{f.name}</span>
                <span className="text-xs text-[var(--orange-bright)] shrink-0 tabular-nums">
                  {f.proteinPer100g.toFixed(1)} g
                </span>
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                {f.category} · {Math.round(f.caloriesPer100g)} kcal / 100 g
              </div>
            </button>
          </li>
        ))}
      </ul>

      {query.length > 0 && results.length === 0 && (
        <div className="text-sm text-[var(--text-dim)] text-center pt-6">
          Nenhum alimento encontrado.
        </div>
      )}
    </div>
  );
}
