'use client';

import { Trash2 } from 'lucide-react';
import { Entry } from '@/lib/types';
import { gramsLabel, kcalLabel, proteinLabel } from '@/lib/format';

type Props = {
  entries: Entry[];
  onDelete?: (id: string) => void;
  emptyText?: string;
};

export function EntryList({ entries, onDelete, emptyText = 'Nada registrado ainda.' }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-[var(--text-dim)] py-8 text-sm">
        {emptyText}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((e) => (
        <li
          key={e.id}
          className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-3"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{e.foodSnapshot.name}</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5 flex gap-2 flex-wrap">
              <span>{gramsLabel(e.grams)}</span>
              <span>·</span>
              <span className="text-[var(--orange-bright)]">{proteinLabel(e.proteinG)} prot</span>
              <span>·</span>
              <span>{kcalLabel(e.kcal)}</span>
              <span>·</span>
              <span>{e.time}</span>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(e.id)}
              aria-label="Remover"
              className="p-2 text-[var(--text-dim)] hover:text-[var(--red)] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
