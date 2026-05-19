'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { ProteinRing } from '@/components/ProteinRing';
import { EntryList } from '@/components/EntryList';
import { SuggestionsList } from '@/components/SuggestionsList';
import { PageHeader } from '@/components/PageHeader';
import { useAppData } from '@/lib/useAppData';
import { entriesForDate, todayDateString, totalsForDate } from '@/lib/storage';
import { prettyDate } from '@/lib/format';
import { OnboardingCard } from '@/components/OnboardingCard';

export default function TodayPage() {
  const { data, hydrated, update } = useAppData();
  const date = todayDateString();

  const { entries, totals } = useMemo(() => ({
    entries: entriesForDate(data, date),
    totals: totalsForDate(data, date),
  }), [data, date]);

  if (!hydrated) {
    return (
      <div className="px-5 pt-10 text-[var(--text-dim)] text-sm">Carregando…</div>
    );
  }

  if (!data.onboardingComplete) {
    return <OnboardingCard onDone={(goal) => update((d) => ({ ...d, proteinGoalG: goal, onboardingComplete: true }))} />;
  }

  const gap = Math.max(data.proteinGoalG - totals.proteinG, 0);

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Hoje" subtitle={prettyDate(date)} />

      <section className="flex justify-center py-4">
        <ProteinRing current={totals.proteinG} goal={data.proteinGoalG} />
      </section>

      <section className="px-5 mt-2 flex items-center justify-around text-center">
        <div>
          <div className="text-xs text-[var(--text-dim)] uppercase tracking-wider">Calorias</div>
          <div className="text-xl font-semibold tabular-nums mt-0.5">{Math.round(totals.kcal)}</div>
        </div>
        <div className="w-px h-10 bg-[var(--border)]" />
        <div>
          <div className="text-xs text-[var(--text-dim)] uppercase tracking-wider">Refeições</div>
          <div className="text-xl font-semibold tabular-nums mt-0.5">{entries.length}</div>
        </div>
        <div className="w-px h-10 bg-[var(--border)]" />
        <div>
          <div className="text-xs text-[var(--text-dim)] uppercase tracking-wider">Meta</div>
          <div className="text-xl font-semibold tabular-nums mt-0.5">{data.proteinGoalG} g</div>
        </div>
      </section>

      <section className="px-5 mt-6">
        <Link
          href="/adicionar"
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-[var(--orange)] text-black font-semibold text-base active:bg-[var(--orange-bright)]"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          Adicionar alimento
        </Link>
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          O que você comeu hoje
        </h2>
        <EntryList
          entries={entries}
          emptyText="Nenhuma refeição registrada ainda."
          onDelete={(id) => update((d) => ({ ...d, entries: d.entries.filter((e) => e.id !== id) }))}
        />
      </section>

      {data.prefs.suggestionsEnabled && gap > 0 && (
        <section className="px-5 mt-8">
          <SuggestionsList proteinGapG={gap} />
        </section>
      )}
    </div>
  );
}
