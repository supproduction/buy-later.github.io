import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductImage } from '../../components/product/ProductImage';
import { useCartStore, selectCartTotal } from '../../stores/cart.store';
import { useTranslation } from '../../i18n';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore(selectCartTotal);
  const { t, formatCurrency } = useTranslation();

  const currency = items[0]?.product.currency ?? 'EUR';

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title={t('cart.title')} />
        <EmptyState
          emoji="🛒"
          title={t('cart.emptyTitle')}
          description={t('cart.emptyDesc')}
          action={{ to: '/products', label: t('cart.emptyCta') }}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('cart.title')} subtitle={t('cart.subtitle')} />

      <ul className="flex flex-col gap-3">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="card flex gap-3 p-3">
            <ProductImage
              src={product.imageUrl}
              alt={product.title}
              className="h-20 w-20 shrink-0 rounded-xl"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-ink-900">{product.title}</h3>
                  <p className="text-xs text-ink-400">{t(`categories.${product.category}`)}</p>
                </div>
                <span className="font-semibold text-ink-900">
                  {formatCurrency(product.price * quantity, product.currency)}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="btn-secondary h-8 w-8 !px-0"
                    aria-label={t('cart.decrease', { name: product.title })}
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    −
                  </button>
                  <span
                    className="w-9 text-center text-sm font-medium"
                    aria-label={t('cart.quantity', { n: quantity })}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="btn-secondary h-8 w-8 !px-0"
                    aria-label={t('cart.increase', { name: product.title })}
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="btn-ghost text-rose-600 hover:bg-rose-50"
                  onClick={() => removeItem(product.id)}
                >
                  {t('cart.remove')}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="card mt-5 p-5">
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium text-ink-600">{t('cart.total')}</span>
          <span className="font-bold text-ink-900">{formatCurrency(total, currency)}</span>
        </div>

        <div className="mt-4">
          <TransparencyNotice variant="strong" title={t('cart.transTitle')}>
            {t('cart.transBody')}
          </TransparencyNotice>
        </div>

        <Link to="/checkout" className="btn-primary mt-4 w-full">
          {t('cart.checkout')}
        </Link>
        <Link to="/products" className="btn-ghost mt-2 w-full">
          {t('cart.keepBrowsing')}
        </Link>
      </div>
    </div>
  );
}
