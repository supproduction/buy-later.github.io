import { useEffect } from 'react';
import { useOrderStore } from '../stores/order.store';

/**
 * Periodically recompute simulated order statuses while a relevant screen is
 * mounted. The status itself is derived from time, so this just nudges the
 * store to re-evaluate and persist history transitions.
 */
export function useOrderTicker(intervalMs = 1000) {
  const refreshStatuses = useOrderStore((s) => s.refreshStatuses);
  useEffect(() => {
    refreshStatuses();
    const id = window.setInterval(refreshStatuses, intervalMs);
    return () => window.clearInterval(id);
  }, [refreshStatuses, intervalMs]);
}
