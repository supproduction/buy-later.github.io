import { useSyncStatus } from '../../stores/sync-status.store';
import { useTranslation } from '../../i18n';

const CONFIG = {
  'signed-out': { key: 'sync.local', dot: 'bg-ink-300', text: 'text-ink-500', pulse: false },
  syncing: { key: 'sync.syncing', dot: 'bg-amber-400', text: 'text-amber-700', pulse: true },
  synced: { key: 'sync.synced', dot: 'bg-brand-500', text: 'text-brand-700', pulse: false },
  error: { key: 'sync.error', dot: 'bg-rose-500', text: 'text-rose-600', pulse: false },
} as const;

/** Compact cloud-sync status pill. Hidden entirely when Supabase isn't configured. */
export function SyncBadge() {
  const status = useSyncStatus((s) => s.status);
  const message = useSyncStatus((s) => s.message);
  const { t } = useTranslation();

  if (status === 'disabled') return null;
  const c = CONFIG[status];
  const label = t(c.key);

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1"
      title={message || label}
      aria-label={message || label}
    >
      <span className={`h-2 w-2 rounded-full ${c.dot} ${c.pulse ? 'animate-pulse' : ''}`} />
      <span className={`hidden text-xs font-medium sm:inline ${c.text}`}>{label}</span>
    </span>
  );
}
