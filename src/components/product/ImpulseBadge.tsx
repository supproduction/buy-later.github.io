import type { Product } from '../../types/product';
import { impulseBand, impulseScore } from '../../lib/impulse-score';
import { useTranslation } from '../../i18n';

const BAND_CLASS = {
  low: 'bg-brand-100 text-brand-700',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-700',
} as const;

/** Compact impulse-score chip (0–100 + band). */
export function ImpulseBadge({
  product,
  showLabel = false,
}: {
  product: Pick<Product, 'id' | 'price' | 'category'>;
  showLabel?: boolean;
}) {
  const { t } = useTranslation();
  const score = impulseScore(product);
  const band = impulseBand(score);

  return (
    <span
      className={`chip ${BAND_CLASS[band]}`}
      title={t('impulse.aria', { score, band: t(`impulse.${band}`) })}
    >
      ⚡ {showLabel ? `${t('impulse.label')}: ` : ''}
      {score}
      <span className="ml-1 opacity-70">· {t(`impulse.${band}`)}</span>
    </span>
  );
}
