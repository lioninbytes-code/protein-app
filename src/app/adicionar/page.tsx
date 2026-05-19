'use client';

import { useState } from 'react';
import { Search, Barcode, Camera } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FoodSearch } from '@/components/FoodSearch';
import { BarcodeTab } from '@/components/BarcodeTab';
import { PhotoTab } from '@/components/PhotoTab';
import { useAppData } from '@/lib/useAppData';

type Tab = 'search' | 'barcode' | 'photo';

export default function AddFoodPage() {
  const [tab, setTab] = useState<Tab>('search');
  const { data, hydrated } = useAppData();

  if (!hydrated) {
    return <div className="px-5 pt-10 text-[var(--text-dim)] text-sm">Carregando…</div>;
  }

  const photoEnabled = data.prefs.photoEnabled && data.apiSpend.totalCents < data.apiSpend.capCents;

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Adicionar" subtitle="Buscar, escanear ou fotografar" />

      <div className="px-5">
        <div className="grid grid-cols-3 gap-2 bg-[var(--bg-card)] p-1 rounded-2xl">
          <TabButton active={tab === 'search'} onClick={() => setTab('search')} icon={<Search className="w-4 h-4" />} label="Buscar" />
          <TabButton active={tab === 'barcode'} onClick={() => setTab('barcode')} icon={<Barcode className="w-4 h-4" />} label="Código" />
          <TabButton
            active={tab === 'photo'}
            onClick={() => photoEnabled && setTab('photo')}
            icon={<Camera className="w-4 h-4" />}
            label="Foto"
            disabled={!photoEnabled}
          />
        </div>
      </div>

      <div className="px-5 pt-5">
        {tab === 'search' && <FoodSearch />}
        {tab === 'barcode' && <BarcodeTab />}
        {tab === 'photo' && photoEnabled && <PhotoTab />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'bg-[var(--orange)] text-black'
          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {icon}
      {label}
    </button>
  );
}
