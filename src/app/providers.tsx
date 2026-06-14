import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SyncManager } from '../components/SyncManager';

/**
 * App-wide providers. Zustand stores are module singletons (no context
 * provider needed). SyncManager is a headless cloud-sync driver (no-op unless
 * Supabase is configured and a user is signed in).
 */
export function Providers() {
  return (
    <>
      <SyncManager />
      <RouterProvider router={router} />
    </>
  );
}
