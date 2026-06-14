import type { Product } from '../../types/product';
import { useTranslation } from '../../i18n';
import { ProductImage } from './ProductImage';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onVirtualBuy: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onVirtualBuy }: ProductCardProps) {
  const { t, formatCurrency } = useTranslation();
  const hasRef = product.originalPrice != null && product.originalPrice > product.price;
  const isPopular = (product.rating ?? 0) >= 4.5;

  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          className="aspect-square w-full"
        />
        <span className="chip absolute left-2 top-2 bg-white/90 text-ink-700 shadow-sm">
          {t(`categories.${product.category}`)}
        </span>
        <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
          {product.source === 'manual' && (
            <span className="chip bg-brand-600 text-white shadow-sm">{t('product.yourItem')}</span>
          )}
          {isPopular && (
            <span className="chip bg-amber-100 text-amber-800 shadow-sm">
              ⭐ {t('product.popular')}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-1 font-semibold leading-snug text-ink-900">{product.title}</h3>
        {product.storeName && (
          <p className="mt-0.5 truncate text-xs text-ink-400">{product.storeName}</p>
        )}

        {product.rating != null && <StarRating rating={product.rating} className="mt-1.5" />}

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-lg font-bold text-ink-900">
            {formatCurrency(product.price, product.currency)}
          </span>
          {hasRef && (
            <span className="flex items-baseline gap-1" title={t('product.refPriceTitle')}>
              <span className="text-sm text-ink-400 line-through">
                {formatCurrency(product.originalPrice as number, product.currency)}
              </span>
              <span className="text-[10px] font-medium uppercase text-ink-300">
                {t('product.refPriceShort')}
              </span>
            </span>
          )}
        </div>

        {/* Persistent honesty cue, mirroring the calm anti-impulse positioning. */}
        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-brand-700">
          <span aria-hidden="true">🔒</span>
          {t('product.noRealMoney')}
        </p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="btn-secondary flex-1 !px-2 text-xs"
            onClick={() => onAddToCart(product)}
          >
            {t('product.addToCart')}
          </button>
          <button
            type="button"
            className="btn-primary flex-1 !px-2 text-xs"
            onClick={() => onVirtualBuy(product)}
          >
            {t('product.virtualBuy')}
          </button>
        </div>
      </div>
    </article>
  );
}
