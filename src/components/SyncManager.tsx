import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseEnabled } from '../lib/supabase';
import { reconcile, subscribeSync } from '../lib/sync';
import { useSyncStatus } from '../stores/sync-status.store';

/** Read an auth error returned in the redirect URL hash (e.g. expired link). */
function readAuthErrorFromHash(): string | null {
  if (typeof window === 'undefined' || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  if (params.get('error')) {
    const desc = params.get('error_description')?.replace(/\+/g, ' ');
    // Clean the hash so the error doesn't stick around on refresh.
    history.replaceState(null, '', window.location.pathname + window.location.search);
    return desc || params.get('error') || 'Sign-in failed';
  }
  return null;
}

/**
 * Headless: drives cloud sync while signed in and reflects status in the UI.
 * Reconciles once on sign-in, then subscribes for debounced pushes. No-op when
 * signed out or when Supabase isn't configured.
 */
export function SyncManager() {
  const { user, ready } = useAuth();
  const setStatus = useSyncStatus((s) => s.setStatus);
  const cleanup = useRef<(() => void) | null>(null);

  // Surface auth errors from the magic-link redirect once on mount.
  useEffect(() => {
    if (!isSupabaseEnabled) return;
    const err = readAuthErrorFromHash();
    if (err) setStatus('error', err);
  }, [setStatus]);

  useEffect(() => {
    if (!isSupabaseEnabled || !ready) return;
    cleanup.current?.();
    cleanup.current = null;

    if (!user) {
      setStatus('signed-out');
      return;
    }

    let active = true;
    void reconcile(user.id).then(() => {
      if (active) cleanup.current = subscribeSync(user.id);
    });
    return () => {
      active = false;
      cleanup.current?.();
      cleanup.current = null;
    };
  }, [user?.id, ready, setStatus]);

  return null;
}
