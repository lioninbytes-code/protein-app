type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function PageHeader({ title, subtitle, right }: Props) {
  return (
    <header className="flex items-end justify-between gap-3 px-5 pt-6 pb-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] truncate">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-muted)] mt-0.5 truncate">{subtitle}</p>
        )}
      </div>
      {right}
    </header>
  );
}
