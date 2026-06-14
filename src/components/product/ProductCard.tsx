import type { Product } from '../../types/product';
import { useTranslation } from '../../i18n';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onVirtualBuy: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onVirtualBuy }: ProductCardProps) {
  const { t, formatCurrency } = useTranslation();
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
        {product.source === 'manual' && (
          <span className="chip absolute right-2 top-2 bg-brand-600 text-white shadow-sm">
            {t('product.yourItem')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-ink-900">{product.title}</h3>
        {product.storeName && (
          <p className="mt-0.5 text-xs text-ink-400">{product.storeName}</p>
        )}
        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-ink-900">
            {formatCurrency(product.price, product.currency)}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="btn-secondary flex-1"
            onClick={() => onAddToCart(product)}
          >
            {t('product.addToCart')}
          </button>
          <button
            type="button"
            className="btn-primary flex-1"
            onClick={() => onVirtualBuy(product)}
          >
            {t('product.virtualBuy')}
          </button>
        </div>
      </div>
    </article>
  );
}
