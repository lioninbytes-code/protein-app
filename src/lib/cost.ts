export const HAIKU_INPUT_PER_MTOK_USD = 1.0;
export const HAIKU_OUTPUT_PER_MTOK_USD = 5.0;

export function estimateRequestCents(inputTokens: number, outputTokens: number): number {
  const inputUSD = (inputTokens / 1_000_000) * HAIKU_INPUT_PER_MTOK_USD;
  const outputUSD = (outputTokens / 1_000_000) * HAIKU_OUTPUT_PER_MTOK_USD;
  return Math.ceil((inputUSD + outputUSD) * 100);
}

export type BudgetState = 'ok' | 'warn' | 'critical' | 'exceeded';

export function budgetState(totalCents: number, capCents: number): BudgetState {
  const ratio = totalCents / capCents;
  if (ratio >= 1) return 'exceeded';
  if (ratio >= 0.9) return 'critical';
  if (ratio >= 0.8) return 'warn';
  return 'ok';
}
