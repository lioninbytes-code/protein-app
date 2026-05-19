export function gramsLabel(g: number): string {
  if (g >= 100) return `${Math.round(g)} g`;
  if (g >= 10) return `${g.toFixed(1)} g`;
  return `${g.toFixed(1)} g`;
}

export function kcalLabel(k: number): string {
  return `${Math.round(k)} kcal`;
}

export function proteinLabel(p: number): string {
  return `${p.toFixed(1)} g`;
}

export function centsToUSD(c: number): string {
  return `US$ ${(c / 100).toFixed(2)}`;
}

const MONTHS_PT = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
];

export function prettyDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} de ${MONTHS_PT[m - 1]} de ${y}`;
}

export function shortDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-').map(Number);
  return `${d}/${String(m).padStart(2, '0')}`;
}
