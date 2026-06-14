import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { reconcile, subscribeSync } from '../lib/sync';

/**
 * Headless: drives cloud sync while signed in. Reconciles once on sign-in, then
 * subscribes for debounced pushes. Renders nothing; safe no-op when signed out.
 */
export function SyncManager() {
  const { user } = useAuth();
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanup.current?.();
    cleanup.current = null;
    if (!user) return;

    let active = true;
    void reconcile(user.id).then(() => {
      if (active) cleanup.current = subscribeSync(user.id);
    });
    return () => {
      active = false;
      cleanup.current?.();
      cleanup.current = null;
    };
  }, [user?.id]);

  return null;
}
