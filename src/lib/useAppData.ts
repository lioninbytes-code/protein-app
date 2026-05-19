'use client';

import { useCallback, useEffect, useState } from 'react';
import { loadData, saveData } from './storage';
import { AppData, DEFAULT_DATA } from './types';

export function useAppData() {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadData());
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith('protein-app')) {
        setData(loadData());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const update = useCallback((updater: (d: AppData) => AppData) => {
    setData((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  return { data, hydrated, update };
}
