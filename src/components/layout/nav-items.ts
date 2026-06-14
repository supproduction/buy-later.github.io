export interface NavItem {
  to: string;
  /** Translation key under `nav.*`. */
  key: 'home' | 'products' | 'avoided' | 'orders' | 'stats';
  /** Inline SVG path data for a simple 24x24 stroke icon. */
  icon: string;
}

/** Primary navigation — focused on the one job: mindful spending. */
export const NAV_ITEMS: NavItem[] = [
  { to: '/', key: 'home', icon: 'M3 11.5 12 4l9 7.5M5 10v10h14V10' },
  {
    to: '/products',
    key: 'products',
    icon: 'M4 7h16M4 12h16M4 17h10',
  },
  {
    to: '/avoided-purchases',
    key: 'avoided',
    icon: 'M20.8 5.6a5.5 5.5 0 0 0-8.8 1.4 5.5 5.5 0 0 0-8.8-1.4 5.5 5.5 0 0 0 0 7.8L12 21l8.8-7.6a5.5 5.5 0 0 0 0-7.8Z',
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
