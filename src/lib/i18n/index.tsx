import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { en, type Dict } from './en';
import { es } from './es';
import { zh } from './zh';

export type Lang = 'en' | 'es' | 'zh';

export const LANGS: { code: Lang; label: string; nativeName: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'es', label: 'ES', nativeName: 'Español' },
  { code: 'zh', label: '中文', nativeName: '中文' },
];

const DICTS: Record<Lang, Dict> = { en, es, zh };

export function isLang(v: string | undefined): v is Lang {
  return v === 'en' || v === 'es' || v === 'zh';
}

export function detectLang(): Lang {
  const saved = localStorage.getItem('car.lang');
  if (isLang(saved ?? undefined)) return saved as Lang;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

interface I18nValue {
  lang: Lang;
  d: Dict;
  /** Swap the locale segment of the current URL and persist the choice. */
  setLang: (next: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('car.lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    document.title = DICTS[lang].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', DICTS[lang].meta.description);
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      d: DICTS[lang],
      setLang: (next) => {
        if (next === lang) return;
        localStorage.setItem('car.lang', next);
        const { pathname, hash } = window.location;
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        const rel = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
        const parts = rel.split('/').filter(Boolean);
        if (isLang(parts[0])) parts[0] = next;
        else parts.unshift(next);
        navigate(`/${parts.join('/')}${hash}`);
      },
    }),
    [lang, navigate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
