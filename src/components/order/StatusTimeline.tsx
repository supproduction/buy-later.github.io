import { ORDER_STATUS_SEQUENCE, type VirtualOrder } from '../../types/order';
import { statusIndex } from '../../lib/order';
import { useTranslation } from '../../i18n';

interface StatusTimelineProps {
  order: VirtualOrder;
}

/** Vertical timeline of simulated delivery statuses. */
export function StatusTimeline({ order }: StatusTimelineProps) {
  const { t, formatDate } = useTranslation();
  const currentIndex = statusIndex(order.currentStatus);
  const historyByStatus = new Map(order.statusHistory.map((h) => [h.status, h]));

  return (
    <ol className="relative ml-3 border-l border-ink-200">
      {ORDER_STATUS_SEQUENCE.map((status, index) => {
        const completed = index < currentIndex;
        const current = index === currentIndex;
        const future = index > currentIndex;
        const reachedAt = historyByStatus.get(status)?.timestamp;

        return (
          <li key={status} className="mb-5 ml-5 last:mb-0">
            <span
              className={`absolute -left-[9px] grid h-4 w-4 place-items-center rounded-full ring-4 ring-white ${
                completed ? 'bg-brand-500' : current ? 'bg-brand-600' : 'bg-ink-200'
              }`}
              aria-hidden="true"
            >
              {completed && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                  <path
                    d="M2 6.5 4.5 9 10 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            <div className="flex flex-col">
              <span
                className={`text-sm font-semibold ${
                  future ? 'text-ink-400' : 'text-ink-900'
                } ${current ? 'text-brand-700' : ''}`}
              >
                {t(`status.${status}`)}
                {current && (
                  <span className="ml-2 chip bg-brand-100 text-brand-700">
                    {t('timeline.current')}
                  </span>
                )}
              </span>
              {reachedAt && !future && (
                <time className="text-xs text-ink-400" dateTime={reachedAt}>
                  {formatDate(reachedAt)}
                </time>
              )}
              {future && <span className="text-xs text-ink-300">{t('timeline.pending')}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
