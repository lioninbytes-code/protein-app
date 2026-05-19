'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plus, History, Settings } from 'lucide-react';
import clsx from 'clsx';

const tabs = [
  { href: '/', label: 'Hoje', icon: Home },
  { href: '/adicionar', label: 'Adicionar', icon: Plus, primary: true },
  { href: '/historico', label: 'Histórico', icon: History },
  { href: '/configuracoes', label: 'Ajustes', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--bg-elevated)]/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto max-w-md grid grid-cols-4 gap-1 px-2 py-2">
        {tabs.map(({ href, label, icon: Icon, primary }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-colors',
                primary && 'bg-[var(--orange)] text-black',
                primary && active && 'bg-[var(--orange-bright)]',
                !primary && active && 'text-[var(--orange)]',
                !primary && !active && 'text-[var(--text-muted)]',
              )}
            >
              <Icon className={clsx('w-6 h-6', primary && 'w-7 h-7')} strokeWidth={primary ? 2.5 : 2} />
              <span className={clsx('text-[11px] font-medium', primary && 'font-semibold')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
