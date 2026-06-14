import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Optional Supabase client. The app is offline-first: when these env vars are
 * absent (or no user is signed in), everything works locally via localStorage
 * exactly as before. Supabase only adds optional accounts + cross-device sync.
 *
 * Both values are safe in the frontend — the anon/publishable key is protected
 * by Row-Level Security. The database password is never used client-side.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;
