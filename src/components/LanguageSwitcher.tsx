import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LANGS, useI18n } from '../lib/i18n';
import { Icon } from './icons';

export function LanguageSwitcher({ up = false }: { up?: boolean }) {
  const { lang, setLang, d } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost btn-sm gap-1.5"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={d.nav.language}
      >
        <Icon name="globe" size={15} />
        {current.label}
        <Icon name="chevronDown" size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            role="listbox"
            className={`absolute right-0 z-50 w-36 overflow-hidden rounded-xl border border-line bg-night-800 p-1 shadow-pop ${
              up ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
          >
            {LANGS.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${
                    l.code === lang ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {l.nativeName}
                  {l.code === lang && <Icon name="check" size={14} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
