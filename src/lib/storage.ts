import { AppData, DEFAULT_DATA, Entry, Food, ApiSpendEntry } from './types';

const KEY = 'protein-app-v1';

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadData(): AppData {
  if (!isBrowser()) return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      ...DEFAULT_DATA,
      ...parsed,
      apiSpend: { ...DEFAULT_DATA.apiSpend, ...(parsed.apiSpend ?? {}) },
      prefs: { ...DEFAULT_DATA.prefs, ...(parsed.prefs ?? {}) },
    };
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: AppData): void {
  if (!isBrowser()) return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function updateData(updater: (d: AppData) => AppData): AppData {
  const next = updater(loadData());
  saveData(next);
  return next;
}

export function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function nowTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function addEntry(food: Food, grams: number): Entry {
  const entry: Entry = {
    id: crypto.randomUUID(),
    foodId: food.id,
    foodSnapshot: food,
    grams,
    date: todayDateString(),
    time: nowTimeString(),
    proteinG: (food.proteinPer100g * grams) / 100,
    kcal: (food.caloriesPer100g * grams) / 100,
  };
  updateData((d) => ({ ...d, entries: [...d.entries, entry] }));
  return entry;
}

export function removeEntry(entryId: string): void {
  updateData((d) => ({ ...d, entries: d.entries.filter((e) => e.id !== entryId) }));
}

export function entriesForDate(data: AppData, date: string): Entry[] {
  return data.entries.filter((e) => e.date === date);
}

export function totalsForDate(data: AppData, date: string) {
  const entries = entriesForDate(data, date);
  return entries.reduce(
    (acc, e) => ({
      proteinG: acc.proteinG + e.proteinG,
      kcal: acc.kcal + e.kcal,
    }),
    { proteinG: 0, kcal: 0 }
  );
}

export function addCustomFood(food: Food): void {
  updateData((d) => ({ ...d, customFoods: [...d.customFoods, food] }));
}

export function logApiSpend(cents: number, kind: ApiSpendEntry['kind'] = 'photo'): void {
  updateData((d) => ({
    ...d,
    apiSpend: {
      ...d.apiSpend,
      totalCents: d.apiSpend.totalCents + cents,
      log: [...d.apiSpend.log, { date: todayDateString(), cents, kind }],
    },
  }));
}
