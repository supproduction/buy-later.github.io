import { useEffect } from 'react';
import { Providers } from './providers';
import { useLangStore, LANGUAGES } from '../i18n';

export function App() {
  const lang = useLangStore((s) => s.lang);

  // Keep the document language in sync for accessibility / SEO.
  useEffect(() => {
    const intl = LANGUAGES.find((l) => l.code === lang)?.intl ?? lang;
    document.documentElement.lang = intl;
  }, [lang]);

  return <Providers />;
}
