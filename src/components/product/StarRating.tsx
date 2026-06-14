import { useTranslation } from '../../i18n';

interface StarRatingProps {
  rating: number;
  className?: string;
}

/** Compact 5-star rating with a numeric value. Read-only, informational. */
export function StarRating({ rating, className = '' }: StarRatingProps) {
  const { t } = useTranslation();
  const clamped = Math.max(0, Math.min(5, rating));
  const rounded = Math.round(clamped);

  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      role="img"
      aria-label={t('product.ratingAria', { rating: clamped.toFixed(1) })}
    >
      <span aria-hidden="true" className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${i < rounded ? 'text-amber-400' : 'text-ink-200'}`}
            fill="currentColor"
          >
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
        ))}
      </span>
      <span className="text-xs font-medium text-ink-500">{clamped.toFixed(1)}</span>
    </span>
  );
}
