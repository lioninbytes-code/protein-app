'use client';

import Link from 'next/link';
import { bestProteinPerCalorie } from '@/lib/taco';

type Props = {
  proteinGapG: number;
  max?: number;
};

export function SuggestionsList({ proteinGapG, max = 5 }: Props) {
  if (proteinGapG <= 0) return null;
  const top = bestProteinPerCalorie(max);

  return (
    <section>
      <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
        Sugestões pra completar {proteinGapG.toFixed(0)} g
      </h2>
      <ul className="grid gap-2">
        {top.map((f) => {
          const gramsToFill = (proteinGapG / f.proteinPer100g) * 100;
          const kcalToFill = (f.caloriesPer100g * gramsToFill) / 100;
          const suggestedGrams = Math.max(1, Math.round(gramsToFill));
          return (
            <li key={f.id}>
              <Link
                href={`/adicionar?food=${encodeURIComponent(f.id)}&grams=${suggestedGrams}`}
                className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 active:bg-[var(--bg-elevated)] transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium truncate">{f.name}</span>
                  <span className="text-xs text-[var(--orange-bright)] tabular-nums shrink-0">
                    {f.proteinPer100g.toFixed(1)} g / 100 g
                  </span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 flex items-center justify-between">
                  <span>
                    ≈ <span className="text-[var(--text)] font-medium">{suggestedGrams} g</span> ={' '}
                    {Math.round(kcalToFill)} kcal
                  </span>
                  <span className="text-[var(--orange)] font-medium">Adicionar →</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/adicionar"
        className="block text-center mt-3 text-xs text-[var(--orange)] underline-offset-4 hover:underline"
      >
        Buscar outro alimento
      </Link>
    </section>
  );
}
