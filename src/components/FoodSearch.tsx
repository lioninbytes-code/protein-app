'use client';

import { useMemo, useState } from 'react';
import { Search, Sparkles, AlertCircle, Ban, Database } from 'lucide-react';
import { searchFoods, allFoods } from '@/lib/taco';
import { Food } from '@/lib/types';
import { ConfirmFood } from './ConfirmFood';
import { useAppData } from '@/lib/useAppData';
import { addCustomFood, logApiSpend } from '@/lib/storage';
import { budgetState } from '@/lib/cost';
import { centsToUSD } from '@/lib/format';

type WebState =
  | { kind: 'idle' }
  | { kind: 'loading'; query: string }
  | { kind: 'error'; message: string }
  | { kind: 'not-food'; identifiedAs: string };

export function FoodSearch() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Food | null>(null);
  const [webState, setWebState] = useState<WebState>({ kind: 'idle' });
  const { data } = useAppData();

  const results = useMemo(
    () => searchFoods(query, allFoods(data.customFoods)),
    [query, data.customFoods],
  );

  const bState = budgetState(data.apiSpend.totalCents, data.apiSpend.capCents);
  const canSearchWeb = data.prefs.photoEnabled && bState !== 'exceeded';

  async function searchOnWeb() {
    if (!query.trim()) return;
    setWebState({ kind: 'loading', query: query.trim() });
    try {
      const res = await fetch('/api/buscar-produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: query.trim() }),
      });
      const json = await res.json();

      if (typeof json.estimatedCents === 'number') {
        logApiSpend(json.estimatedCents, 'photo');
      }

      if (json.errorKind === 'not_food') {
        setWebState({
          kind: 'not-food',
          identifiedAs: json.identifiedAs || 'item não alimentício',
        });
        return;
      }

      if (!res.ok || json.error || json.errorKind === 'not_found') {
        setWebState({
          kind: 'error',
          message: json.error || 'Alimento não encontrado nem na web.',
        });
        return;
      }

      const slug = String(json.name || query)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 50);

      const food: Food = {
        id: `web-${slug || Date.now()}`,
        source: 'custom',
        name: json.name,
        brand: json.brand,
        category: json.category || 'Web',
        proteinPer100g: json.proteinPer100g,
        caloriesPer100g: json.caloriesPer100g,
        carbsPer100g: json.carbsPer100g,
        fatPer100g: json.fatPer100g,
        servingGrams: json.servingGrams,
      };

      addCustomFood(food);
      setWebState({ kind: 'idle' });
      setSelected(food);
    } catch (e) {
      setWebState({ kind: 'error', message: (e as Error).message });
    }
  }

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
          onChange={(e) => {
            setQuery(e.target.value);
            setWebState({ kind: 'idle' });
          }}
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
        {results.map((f) => {
          const isCustom = f.source !== 'taco';
          return (
            <li key={f.id}>
              <button
                onClick={() => setSelected(f)}
                className="w-full text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3 active:bg-[var(--bg-elevated)] transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium truncate flex items-center gap-1.5">
                    {isCustom && (
                      <Database className="w-3 h-3 text-[var(--green)] shrink-0" aria-label="Cache local" />
                    )}
                    {f.name}
                  </span>
                  <span className="text-xs text-[var(--orange-bright)] shrink-0 tabular-nums">
                    {f.proteinPer100g.toFixed(1)} g
                  </span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  {f.category} · {Math.round(f.caloriesPer100g)} kcal / 100 g
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {query.length >= 2 && webState.kind === 'idle' && (
        <div className="mt-2">
          {results.length === 0 && (
            <div className="text-sm text-[var(--text-dim)] text-center pb-3">
              Nada encontrado no banco local.
            </div>
          )}
          {canSearchWeb ? (
            <button
              onClick={searchOnWeb}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[var(--orange)]/15 border border-[var(--orange)]/30 text-[var(--orange-bright)] font-medium text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Buscar &quot;{query.trim()}&quot; via Claude (~1¢)
            </button>
          ) : (
            <div className="text-xs text-center text-[var(--red)] py-2">
              Saldo de IA esgotado ou desabilitado. Ative em Ajustes.
            </div>
          )}
        </div>
      )}

      {webState.kind === 'loading' && (
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-[var(--text-muted)]">
          <Sparkles className="w-7 h-7 text-[var(--orange)] animate-pulse" />
          <div className="text-sm">Claude pesquisando &quot;{webState.query}&quot;…</div>
          <div className="text-xs">
            Saldo: {centsToUSD(data.apiSpend.totalCents)} / {centsToUSD(data.apiSpend.capCents)}
          </div>
        </div>
      )}

      {webState.kind === 'not-food' && (
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <Ban className="w-10 h-10 text-[var(--red)]" />
          <p className="text-sm font-medium">Isso não é um alimento</p>
          <p className="text-xs text-[var(--text-muted)]">
            Identificado como: {webState.identifiedAs}
          </p>
          <button
            onClick={() => setWebState({ kind: 'idle' })}
            className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm"
          >
            Voltar
          </button>
        </div>
      )}

      {webState.kind === 'error' && (
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <AlertCircle className="w-8 h-8 text-[var(--red)]" />
          <p className="text-xs text-[var(--text-muted)] max-w-xs">{webState.message}</p>
          <button
            onClick={() => setWebState({ kind: 'idle' })}
            className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
