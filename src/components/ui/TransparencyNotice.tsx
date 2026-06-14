interface TransparencyNoticeProps {
  /** 'banner' = subtle informational; 'strong' = high-visibility pre-confirm box. */
  variant?: 'banner' | 'strong';
  title?: string;
  children: React.ReactNode;
}

/**
 * Transparency notice — used to make it impossible to miss that this is a
 * simulation. Visible but calm (not aggressive), per the design direction.
 */
export function TransparencyNotice({
  variant = 'banner',
  title,
  children,
}: TransparencyNoticeProps) {
  const strong = variant === 'strong';
  return (
    <div
      role="note"
      className={
        strong
          ? 'rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900'
          : 'rounded-xl border border-brand-200 bg-brand-50 p-3 text-brand-900'
      }
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-0.5 text-lg leading-none">
          {strong ? '⚠️' : 'ℹ️'}
        </span>
        <div className="text-sm">
          {title && <p className="font-semibold">{title}</p>}
          <div className={title ? 'mt-1' : ''}>{children}</div>
        </div>
      </div>
    </div>
  );
}
