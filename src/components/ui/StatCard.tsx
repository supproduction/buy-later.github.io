interface StatCardProps {
  label: string;
  value: string;
  /** 'hero' = oversized primary KPI; 'default' = secondary metric. */
  variant?: 'hero' | 'default';
  hint?: string;
}

export function StatCard({ label, value, variant = 'default', hint }: StatCardProps) {
  if (variant === 'hero') {
    return (
      <div className="card bg-brand-600 p-6 text-white ring-brand-600 sm:p-8">
        <p className="text-sm font-medium text-brand-50">{label}</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">{value}</p>
        {hint && <p className="mt-1 text-sm text-brand-100">{hint}</p>}
      </div>
    );
  }
  return (
    <div className="card p-4">
      <p className="text-xs font-medium text-ink-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink-900">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
