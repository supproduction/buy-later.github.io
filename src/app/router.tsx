import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ScrollToTop } from '../components/layout/ScrollToTop';

// Lazy-load routes so the initial bundle stays light.
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));
const HowItWorksPage = lazy(() => import('../features/landing/HowItWorksPage'));
const CatalogPage = lazy(() => import('../features/products/CatalogPage'));
const AddItemPage = lazy(() => import('../features/products/AddItemPage'));
const ProductDetailPage = lazy(() => import('../features/products/ProductDetailPage'));
const AvoidedPurchasesPage = lazy(() => import('../features/avoided/AvoidedPurchasesPage'));
const CartPage = lazy(() => import('../features/cart/CartPage'));
const CheckoutPage = lazy(() => import('../features/cart/CheckoutPage'));
const OrdersPage = lazy(() => import('../features/orders/OrdersPage'));
const OrderDetailPage = lazy(() => import('../features/orders/OrderDetailPage'));
const StatsPage = lazy(() => import('../features/stats/StatsPage'));
const PrivacyPage = lazy(() => import('../features/legal/PrivacyPage'));
const TermsPage = lazy(() => import('../features/legal/TermsPage'));
const SettingsPage = lazy(() => import('../features/legal/SettingsPage'));
const NotFoundPage = lazy(() => import('../features/legal/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <AppLayout />
      </>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'products', element: <CatalogPage /> },
      { path: 'products/new', element: <AddItemPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'avoided-purchases', element: <AvoidedPurchasesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:orderId', element: <OrderDetailPage /> },
      { path: 'stats', element: <StatsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
