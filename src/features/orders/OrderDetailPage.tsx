import { lazy, Suspense, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DELIVERY_VIBES, type OrderDecision } from '../../types/order';
import { resolveLocation } from '../../data/locations';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { SimulationBadge } from '../../components/ui/SimulationBadge';
import { StatusTimeline } from '../../components/order/StatusTimeline';
import { DecisionPanel } from '../../components/order/DecisionPanel';
import { ProductImage } from '../../components/product/ProductImage';
import { isPast } from '../../lib/dates';
import { statusIndex } from '../../lib/order';
import { useOrderStore } from '../../stores/order.store';
import { useOrderTicker } from '../../hooks/useOrderTicker';
import { useTranslation } from '../../i18n';

const DELIVERED_INDEX = statusIndex('virtually_delivered');

export default function OrderDetailPage() {
  useOrderTicker();
  const { orderId } = useParams();
  const order = useOrderStore((s) => s.orders.find((o) => o.id === orderId));
  const setDecision = useOrderStore((s) => s.setDecision);
  const [maybeLaterMsg, setMaybeLaterMsg] = useState(false);
  const { t, formatCurrency, formatDate, timeUntil } = useTranslation();

  if (!order) {
    return (
      <div>
        <PageHeader title={t('orderDetail.notFoundTitle')} />
        <EmptyState
          emoji="🔎"
          title={t('orderDetail.notFoundCardTitle')}
          description={t('orderDetail.notFoundDesc')}
          action={{ to: '/orders', label: t('orderDetail.back') }}
        />
      </div>
    );
  }

  const vibe = DELIVERY_VIBES.find((v) => v.value === order.deliveryVibe);
  const canDecide =
    statusIndex(order.currentStatus) >= DELIVERED_INDEX || isPast(order.coolingOffUntil);

  function handleDecide(decision: OrderDecision) {
    if (!order) return;
    setDecision(order.id, decision);
    setMaybeLaterMsg(decision === 'maybe_later');
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-2">
        <Link to="/orders" className="text-sm text-brand-700 hover:underline">
          {t('orderDetail.allOrders')}
        </Link>
      </div>

      <PageHeader
        title={order.orderNumber}
        subtitle={t('orderDetail.placed', { date: formatDate(order.createdAt) })}
      >
        <SimulationBadge />
      </PageHeader>

      <div className="mb-5">
        <TransparencyNotice title={t('orderDetail.transTitle')}>
          {t('orderDetail.transBody')}
        </TransparencyNotice>
      </div>

      {maybeLaterMsg && !order.decision && (
        <div className="mb-5">
          <TransparencyNotice>
            {t('orderDetail.maybeLaterMsg', { time: timeUntil(order.coolingOffUntil) })}
          </TransparencyNotice>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <section className="card p-5" aria-label={t('orderDetail.simulatedDelivery')}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink-900">
              {t('orderDetail.simulatedDelivery')}
            </h2>
            {order.demoMode && (
              <span className="chip bg-amber-100 text-amber-800">{t('orderDetail.demoMode')}</span>
            )}
          </div>
          <StatusTimeline order={order} />
        </section>

        <div className="flex flex-col gap-5">
          <section className="card p-5" aria-label={t('orderDetail.summary')}>
            <h2 className="mb-3 text-base font-semibold text-ink-900">
              {t('orderDetail.summary')}
            </h2>
            <ul className="flex flex-col gap-3">
              {order.items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-12 w-12 shrink-0 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-900">{product.title}</p>
                    <p className="text-xs text-ink-400">{t('orderDetail.qty', { n: quantity })}</p>
                  </div>
                  <span className="text-sm font-medium text-ink-700">
                    {formatCurrency(product.price * quantity, product.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
              <span className="text-sm text-ink-500">
                {vibe ? `${vibe.emoji} ${t(`vibes.${vibe.value}`)}` : t('orders.deliveryVibe')}
              </span>
              <span className="font-bold text-ink-900">
                {formatCurrency(order.total, order.currency)}
              </span>
            </div>
          </section>

          <DecisionPanel order={order} canDecide={canDecide} onDecide={handleDecide} />
        </div>
      </div>
    </div>
  );
}
