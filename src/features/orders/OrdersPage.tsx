import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { OrderCard } from '../../components/order/OrderCard';
import { useOrderStore } from '../../stores/order.store';
import { useOrderTicker } from '../../hooks/useOrderTicker';
import { useTranslation } from '../../i18n';

export default function OrdersPage() {
  useOrderTicker();
  const orders = useOrderStore((s) => s.orders);
  const { t } = useTranslation();

  if (orders.length === 0) {
    return (
      <div>
        <PageHeader title={t('orders.title')} />
        <EmptyState
          emoji="📦"
          title={t('orders.emptyTitle')}
          description={t('orders.emptyDesc')}
          action={{ to: '/products', label: t('orders.emptyCta') }}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('orders.title')} subtitle={t('orders.subtitle')} />
      <ul className="flex flex-col gap-3">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderCard order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}
