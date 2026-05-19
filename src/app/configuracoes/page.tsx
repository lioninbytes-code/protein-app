'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useAppData } from '@/lib/useAppData';
import { centsToUSD } from '@/lib/format';
import { budgetState } from '@/lib/cost';
import { DEFAULT_DATA } from '@/lib/types';

export default function SettingsPage() {
  const { data, hydrated, update } = useAppData();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!hydrated) {
    return <div className="px-5 pt-10 text-[var(--text-dim)] text-sm">Carregando…</div>;
  }

  const bState = budgetState(data.apiSpend.totalCents, data.apiSpend.capCents);

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Ajustes" />

      <div className="px-5 flex flex-col gap-6">
        <Section title="Meta de proteína">
          <Field label="Meta diária (gramas)">
            <input
              type="number"
              inputMode="numeric"
              value={data.proteinGoalG}
              onChange={(e) => update((d) => ({ ...d, proteinGoalG: Math.max(10, Number(e.target.value) || 0) }))}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)] w-32"
            />
          </Field>
          <Field label="Seu peso (kg, opcional)">
            <input
              type="number"
              inputMode="decimal"
              value={data.weightKg ?? ''}
              placeholder="—"
              onChange={(e) => update((d) => ({ ...d, weightKg: e.target.value ? Number(e.target.value) : undefined }))}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)] w-32"
            />
          </Field>
        </Section>

        <Section title="Análise por foto (Claude API)">
          <Toggle
            label="Permitir análise por foto"
            value={data.prefs.photoEnabled}
            onChange={(v) => update((d) => ({ ...d, prefs: { ...d.prefs, photoEnabled: v } }))}
          />
          <Field label="Limite de gasto (centavos US$)">
            <input
              type="number"
              inputMode="numeric"
              value={data.apiSpend.capCents}
              onChange={(e) =>
                update((d) => ({ ...d, apiSpend: { ...d.apiSpend, capCents: Math.max(0, Number(e.target.value) || 0) } }))
              }
              className="bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-lg font-semibold tabular-nums focus:outline-none focus:border-[var(--orange)] w-32"
            />
          </Field>
          <div
            className={`rounded-xl p-3 text-sm ${
              bState === 'critical' ? 'bg-[var(--red)]/15 text-[var(--red)]'
              : bState === 'warn' ? 'bg-[var(--warn)]/15 text-[var(--warn)]'
              : 'bg-[var(--bg)] text-[var(--text-muted)]'
            }`}
          >
            <div className="flex justify-between font-medium">
              <span>Gasto local</span>
              <span className="tabular-nums">
                {centsToUSD(data.apiSpend.totalCents)} / {centsToUSD(data.apiSpend.capCents)}
              </span>
            </div>
            <div className="text-xs mt-1 opacity-80">
              {data.apiSpend.log.length} análises de foto registradas neste app.
            </div>
            <button
              onClick={() => update((d) => ({ ...d, apiSpend: { ...d.apiSpend, totalCents: 0, log: [] } }))}
              className="mt-2 text-xs underline opacity-80"
            >
              Resetar contador local
            </button>
          </div>
          <p className="text-xs text-[var(--text-dim)] leading-relaxed">
            Este contador é estimativa local. Para o limite real (server-side), configure o spending cap em{' '}
            <span className="text-[var(--orange)]">platform.claude.com → Settings → Limits</span>.
          </p>
        </Section>

        <Section title="Sugestões">
          <Toggle
            label="Mostrar sugestões de alimentos quando faltar proteína"
            value={data.prefs.suggestionsEnabled}
            onChange={(v) => update((d) => ({ ...d, prefs: { ...d.prefs, suggestionsEnabled: v } }))}
          />
        </Section>

        <Section title="Dados">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-3 rounded-xl bg-[var(--bg)] border border-[var(--red)]/30 text-[var(--red)] text-sm font-medium"
            >
              Apagar todos os meus dados
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[var(--text-muted)] text-center">
                Tem certeza? Isso apaga todo o histórico, configurações e gasto registrado.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    update(() => DEFAULT_DATA);
                    setConfirmReset(false);
                  }}
                  className="py-3 rounded-xl bg-[var(--red)] text-black font-medium text-sm"
                >
                  Apagar tudo
                </button>
              </div>
            </div>
          )}
        </Section>

        <p className="text-xs text-[var(--text-dim)] text-center py-4">
          Proteína · app pessoal · v0.1
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">{title}</h2>
      <div className="flex flex-col gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
        {children}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-sm text-[var(--text-muted)] flex-1">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-[var(--orange)]' : 'bg-[var(--bg)]'} border ${value ? 'border-[var(--orange)]' : 'border-[var(--border)]'}`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}
