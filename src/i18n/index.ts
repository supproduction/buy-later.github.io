import { useCallback } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '../lib/storage';
import { en, type Dictionary } from './en';
import { de } from './de';
import { pt } from './pt';
import { formatCurrency as fmtCurrency } from '../lib/currency';
import { formatDate as fmtDate, timeUntil as fmtTimeUntil } from '../lib/dates';

export type Lang = 'en' | 'de' | 'pt';

export const LANGUAGES: { code: Lang; label: string; intl: string }[] = [
  { code: 'en', label: 'English', intl: 'en' },
  { code: 'de', label: 'Deutsch', intl: 'de' },
  { code: 'pt', label: 'Português', intl: 'pt-PT' },
];

const DICTIONARIES: Record<Lang, Dictionary> = { en, de, pt };

export type TranslateParams = Record<string, string | number>;

function intlLocale(lang: Lang): string {
  return LANGUAGES.find((l) => l.code === lang)?.intl ?? 'en';
}

/** Best-effort language detection from the browser; defaults to English. */
function detectLang(): Lang {
  try {
    const nav = navigator.language?.toLowerCase() ?? 'en';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('pt')) return 'pt';
  } catch {
    /* ignore */
  }
  return 'en';
}

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: detectLang(),
      setLang: (lang) => set({ lang }),
    }),
    {
      name: STORAGE_KEYS.settings,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Walk a dotted path on a dictionary. */
function resolve(dict: Dictionary, path: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = path.split('.').reduce<any>((acc, key) => (acc == null ? acc : acc[key]), dict);
  return typeof value === 'string' ? value : undefined;
}

function interpolate(str: string, params?: TranslateParams): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{${key}}`,
  );
}

export interface Translation {
  t: (key: string, params?: TranslateParams) => string;
  lang: Lang;
  setLang: (lang: Lang) => void;
  locale: string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (iso: string) => string;
  timeUntil: (iso: string) => string;
}

/** Primary translation hook: text + locale-aware formatters bound to the active language. */
export function useTranslation(): Translation {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  const locale = intlLocale(lang);

  const t = useCallback(
    (key: string, params?: TranslateParams) => {
      const raw = resolve(DICTIONARIES[lang], key) ?? resolve(en, key) ?? key;
      return interpolate(raw, params);
    },
    [lang],
  );

  const formatCurrency = useCallback(
    (amount: number, currency = 'EUR') => fmtCurrency(amount, currency, locale),
    [locale],
  );
  const formatDate = useCallback((iso: string) => fmtDate(iso, locale), [locale]);
  const timeUntil = useCallback((iso: string) => fmtTimeUntil(iso, locale), [locale]);

  return { t, lang, setLang, locale, formatCurrency, formatDate, timeUntil };
}
