import { Link } from 'react-router-dom';
import { DELIVERY_VIBES, type OrderDecision, type VirtualOrder } from '../../types/order';
import { useTranslation } from '../../i18n';

const DECISION_BADGE: Record<OrderDecision, { key: string; className: string }> = {
  avoided: { key: 'orders.avoidedSaved', className: 'bg-brand-100 text-brand-700' },
  still_wanted: { key: 'orders.stillWanted', className: 'bg-ink-100 text-ink-700' },
  maybe_later: { key: 'orders.maybeLater', className: 'bg-amber-100 text-amber-800' },
};

export function OrderCard({ order }: { order: VirtualOrder }) {
  const { t, formatCurrency, formatDate, timeUntil } = useTranslation();
  const vibe = DELIVERY_VIBES.find((v) => v.value === order.deliveryVibe);
  const decisionBadge = order.decision ? DECISION_BADGE[order.decision] : null;

  return (
    <Link to={`/orders/${order.id}`} className="card block p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-semibold text-ink-900">{order.orderNumber}</p>
          <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
        </div>
        <span className="font-semibold text-ink-900">
          {formatCurrency(order.total, order.currency)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="chip bg-ink-100 text-ink-600">
          {vibe ? `${vibe.emoji} ${t(`vibes.${vibe.value}`)}` : t('orders.deliveryVibe')}
        </span>
        {decisionBadge ? (
          <span className={`chip ${decisionBadge.className}`}>{t(decisionBadge.key)}</span>
        ) : (
          <span className="chip bg-brand-50 text-brand-700">
            {t(`status.${order.currentStatus}`)}
          </span>
        )}
        {!order.decision && (
          <span className="text-ink-400">
            {t('orders.reviewIn', { time: timeUntil(order.coolingOffUntil) })}
          </span>
        )}
      </div>
    </Link>
  );
}
