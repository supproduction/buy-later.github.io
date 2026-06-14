import { DEFAULT_COOLING_OFF_DAYS } from '../../lib/dates';
import type { OrderDecision, VirtualOrder } from '../../types/order';
import { useTranslation } from '../../i18n';

interface DecisionPanelProps {
  order: VirtualOrder;
  /** True once the item is virtually delivered or the cooling-off window passed. */
  canDecide: boolean;
  onDecide: (decision: OrderDecision) => void;
}

/** The cooling-off decision UI: "Do you still want this?" + outcome messaging. */
export function DecisionPanel({ order, canDecide, onDecide }: DecisionPanelProps) {
  const { t, formatCurrency } = useTranslation();

  // Outcome views, shown after a final decision is recorded.
  if (order.decision === 'avoided') {
    return (
      <div className="card border-2 border-brand-200 bg-brand-50 p-5 text-center">
        <p className="text-3xl" aria-hidden="true">
          🎉
        </p>
        <h3 className="mt-2 text-lg font-bold text-brand-800">
          {t('decision.avoidedTitle', {
            amount: formatCurrency(order.total, order.currency),
          })}
        </h3>
        <p className="mt-1 text-sm text-brand-700">{t('decision.avoidedSub')}</p>
      </div>
    );
  }

  if (order.decision === 'still_wanted') {
    const linkedItem = order.items.find((i) => i.product.productUrl);
    return (
      <div className="card p-5">
        <h3 className="text-lg font-semibold text-ink-900">{t('decision.stillWantedTitle')}</h3>
        <p className="mt-1 text-sm text-ink-500">{t('decision.stillWantedSub')}</p>
        {linkedItem?.product.productUrl && (
          <a
            href={linkedItem.product.productUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-secondary mt-4"
          >
            {t('decision.openProduct')}
          </a>
        )}
        <p className="mt-3 text-xs text-ink-400">{t('decision.notSell')}</p>
      </div>
    );
  }

  // Pre-decision: either still cooling off, or ready to decide.
  if (!canDecide) {
    return (
      <div className="card p-5">
        <h3 className="text-base font-semibold text-ink-900">{t('decision.coolingTitle')}</h3>
        <p className="mt-1 text-sm text-ink-500">
          {t('decision.coolingBody', { days: DEFAULT_COOLING_OFF_DAYS })}
        </p>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <h3 className="text-lg font-semibold text-ink-900">{t('decision.question')}</h3>
      <p className="mt-1 text-sm text-ink-500">{t('decision.questionSub')}</p>
      <div className="mt-4 flex flex-col gap-2">
        <button type="button" className="btn-primary w-full" onClick={() => onDecide('avoided')}>
          {t('decision.no')}
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => onDecide('maybe_later')}
        >
          {t('decision.maybe')}
        </button>
        <button
          type="button"
          className="btn-ghost w-full"
          onClick={() => onDecide('still_wanted')}
        >
          {t('decision.yes')}
        </button>
      </div>
    </div>
  );
}
