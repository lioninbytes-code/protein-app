'use client';

import { useMemo } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useAppData } from '@/lib/useAppData';
import { Entry } from '@/lib/types';
import { prettyDate, shortDate, proteinLabel, kcalLabel } from '@/lib/format';

export default function HistoryPage() {
  const { data, hydrated } = useAppData();

  const grouped = useMemo(() => {
    const byDate = new Map<string, Entry[]>();
    for (const e of data.entries) {
      const arr = byDate.get(e.date) ?? [];
      arr.push(e);
      byDate.set(e.date, arr);
    }
    return Array.from(byDate.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([date, entries]) => ({
        date,
        entries: entries.sort((a, b) => (a.time < b.time ? -1 : 1)),
        totalProtein: entries.reduce((s, e) => s + e.proteinG, 0),
        totalKcal: entries.reduce((s, e) => s + e.kcal, 0),
      }));
  }, [data.entries]);

  if (!hydrated) {
    return <div className="px-5 pt-10 text-[var(--text-dim)] text-sm">Carregando…</div>;
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        title="Histórico"
        subtitle={`${grouped.length} ${grouped.length === 1 ? 'dia registrado' : 'dias registrados'}`}
      />

      {grouped.length === 0 ? (
        <div className="px-5 mt-12 text-center text-[var(--text-dim)] text-sm">
          Quando você começar a registrar alimentos, o histórico aparece aqui.
        </div>
      ) : (
        <div className="px-5 flex flex-col gap-6">
          {grouped.map((day) => {
            const reached = day.totalProtein >= data.proteinGoalG;
            return (
              <section key={day.date}>
                <header className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-xs text-[var(--text-dim)] uppercase tracking-wider">
                      {shortDate(day.date)}
                    </div>
                    <div className="text-base font-semibold">{prettyDate(day.date)}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-base font-bold tabular-nums ${
                        reached ? 'text-[var(--green)]' : 'text-[var(--orange-bright)]'
                      }`}
                    >
                      {proteinLabel(day.totalProtein)}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{kcalLabel(day.totalKcal)}</div>
                  </div>
                </header>
                <ul className="flex flex-col gap-2">
                  {day.entries.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-3 py-2"
                    >
                      <div className="text-xs text-[var(--text-dim)] w-10 tabular-nums">{e.time}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{e.foodSnapshot.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {Math.round(e.grams)} g · {proteinLabel(e.proteinG)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
