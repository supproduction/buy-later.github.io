export interface NavItem {
  to: string;
  /** Translation key under `nav.*`. */
  key: 'home' | 'products' | 'cart' | 'orders' | 'stats';
  /** Inline SVG path data for a simple 24x24 stroke icon. */
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', key: 'home', icon: 'M3 11.5 12 4l9 7.5M5 10v10h14V10' },
  {
    to: '/products',
    key: 'products',
    icon: 'M4 7h16M4 12h16M4 17h10',
  },
  {
    to: '/cart',
    key: 'cart',
    icon: 'M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L20 8H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  },
  {
    to: '/orders',
    key: 'orders',
    icon: 'M4 5h16v4H4zM4 9v10h16V9M9 13h6',
  },
  {
    to: '/stats',
    key: 'stats',
    icon: 'M5 20V10M12 20V4M19 20v-7',
  },
];
