import type { Product } from '../../types/product';
import { useCommunityStore } from '../../stores/community.store';
import { useTranslation } from '../../i18n';

interface WatchButtonProps {
  product: Product;
  /** 'icon' = compact overlay toggle; 'full' = labelled button. */
  variant?: 'icon' | 'full';
}

/** Toggle a product on the local watchlist ("watch & cool off"). */
export function WatchButton({ product, variant = 'icon' }: WatchButtonProps) {
  const watching = useCommunityStore((s) => s.watch.some((w) => w.product.id === product.id));
  const toggleWatch = useCommunityStore((s) => s.toggleWatch);
  const { t } = useTranslation();
  const label = watching ? t('watch.added') : t('watch.add');

  if (variant === 'icon') {
    return (
      <button
        type="button"
        aria-pressed={watching}
        aria-label={label}
        title={label}
        onClick={(e) => {
          e.preventDefault();
          toggleWatch(product);
        }}
        className={`grid h-8 w-8 place-items-center rounded-full shadow-sm transition-colors ${
          watching ? 'bg-brand-600 text-white' : 'bg-white/90 text-ink-500 hover:text-brand-600'
        }`}
      >
        <span aria-hidden="true">{watching ? '🔖' : '🏷️'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={watching}
      onClick={() => toggleWatch(product)}
      className={watching ? 'btn-primary' : 'btn-secondary'}
    >
      <span aria-hidden="true">{watching ? '🔖' : '🏷️'}</span>
      {label}
    </button>
  );
}
