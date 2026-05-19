'use client';

type Props = {
  current: number;
  goal: number;
  size?: number;
};

export function ProteinRing({ current, goal, size = 220 }: Props) {
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = goal > 0 ? Math.min(current / goal, 1) : 0;
  const offset = circumference * (1 - ratio);
  const percent = Math.round(ratio * 100);
  const remaining = Math.max(goal - current, 0);
  const reached = current >= goal;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-card)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={reached ? 'var(--green)' : 'var(--orange)'}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 600ms ease, stroke 300ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs uppercase tracking-widest text-[var(--text-dim)]">Proteína</span>
        <span className="text-5xl font-bold tabular-nums leading-tight">
          {current.toFixed(0)}
          <span className="text-2xl text-[var(--text-muted)]">/{goal}</span>
        </span>
        <span className="text-sm text-[var(--text-muted)] mt-1">
          {reached ? '🎯 Meta batida!' : `Faltam ${remaining.toFixed(0)} g`}
        </span>
        <span className="text-xs text-[var(--text-dim)] mt-1">{percent}%</span>
      </div>
    </div>
  );
}
