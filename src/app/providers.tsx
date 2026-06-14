import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * App-wide providers. Zustand stores are module singletons (no context
 * provider needed), so for the MVP this just wires the router.
 */
export function Providers() {
  return <RouterProvider router={router} />;
}
