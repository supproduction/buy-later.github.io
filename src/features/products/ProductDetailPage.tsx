import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductImage } from '../../components/product/ProductImage';
import { StarRating } from '../../components/product/StarRating';
import { WatchButton } from '../../components/product/WatchButton';
import { ImpulseBadge } from '../../components/product/ImpulseBadge';
import { useProducts } from '../../hooks/useProducts';
import { useVirtualBuy } from '../../hooks/useVirtualBuy';
import { useCommunityStore } from '../../stores/community.store';
import { useTranslation } from '../../i18n';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const id = productId ?? '';
  const { products } = useProducts();
  const watch = useCommunityStore((s) => s.watch);
  const { addToCart, virtualBuyNow } = useVirtualBuy();
  const { t, formatCurrency } = useTranslation();

  const product =
    products.find((p) => p.id === id) ?? watch.find((w) => w.product.id === id)?.product;

  if (!product) {
    return (
      <div>
        <PageHeader title={t('productDetail.notFoundTitle')} />
        <EmptyState
          emoji="🔎"
          title={t('productDetail.notFoundTitle')}
          description={t('productDetail.notFoundDesc')}
          action={{ to: '/products', label: t('productDetail.back2') }}
        />
      </div>
    );
  }

  const hasRef = product.originalPrice != null && product.originalPrice > product.price;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-2">
        <Link to="/products" className="text-sm text-brand-700 hover:underline">
          {t('productDetail.back')}
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          className="aspect-square w-full rounded-2xl ring-1 ring-ink-100"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="chip w-fit bg-ink-100 text-ink-600">
              {t(`categories.${product.category}`)}
            </span>
            <ImpulseBadge product={product} showLabel />
          </div>
          <h1 className="mt-2 text-2xl font-bold text-ink-900">{product.title}</h1>
          {product.storeName && <p className="text-sm text-ink-400">{product.storeName}</p>}

          {product.rating != null && <StarRating rating={product.rating} className="mt-2" />}

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink-900">
              {formatCurrency(product.price, product.currency)}
            </span>
            {hasRef && (
              <span className="text-sm text-ink-400 line-through" title={t('product.refPriceTitle')}>
                {formatCurrency(product.originalPrice as number, product.currency)}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink-600">{product.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => virtualBuyNow(product)}>
              {t('product.virtualBuy')}
            </button>
            <button type="button" className="btn-secondary" onClick={() => addToCart(product)}>
              {t('product.addToCart')}
            </button>
            <WatchButton product={product} variant="full" />
          </div>
          <p className="mt-2 text-xs text-ink-400">{t('watch.help')}</p>

          {product.productUrl && (
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 text-sm text-brand-700 hover:underline"
            >
              {t('decision.openProduct')}
            </a>
          )}
        </div>
      </div>

      <div className="mt-6">
        <TransparencyNotice title={t('product.noRealMoney')}>
          {t('cart.transBody')}
        </TransparencyNotice>
      </div>
    </div>
  );
}
