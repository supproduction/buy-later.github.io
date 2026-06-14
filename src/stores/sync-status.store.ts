import { create } from 'zustand';
import { isSupabaseEnabled } from '../lib/supabase';

export type SyncStatus = 'disabled' | 'signed-out' | 'syncing' | 'synced' | 'error';

interface SyncStatusState {
  status: SyncStatus;
  /** Optional detail (e.g. an auth error description) for tooltips. */
  message?: string;
  setStatus: (status: SyncStatus, message?: string) => void;
}

export const useSyncStatus = create<SyncStatusState>((set) => ({
  // 'disabled' when Supabase isn't configured at all (no badge shown).
  status: isSupabaseEnabled ? 'signed-out' : 'disabled',
  message: undefined,
  setStatus: (status, message) => set({ status, message }),
}));
