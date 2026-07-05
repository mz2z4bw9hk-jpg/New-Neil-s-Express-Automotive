import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import { useBooking } from './BookingContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { Icon } from './icons';
import { SITE, isOpenNow } from '../lib/site';

export function Navbar() {
  const { d, lang } = useI18n();
  const { openWizard } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const links = [
    { to: `/${lang}`, label: d.nav.home, end: true },
    { to: `/${lang}/services`, label: d.nav.services },
    { to: `/${lang}/about`, label: d.nav.about },
    { to: `/${lang}/visit`, label: d.nav.visit },
  ];

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
      isActive ? 'text-ink after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent' : 'text-dim'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-card' : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          <Link to={`/${lang}`} aria-label={SITE.name} onClick={() => setMenu(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a href={SITE.phoneHref} className="btn-ghost btn-sm" aria-label={`${d.common.callUs}: ${SITE.phone}`}>
              <Icon name="phone" size={14} />
              {SITE.phone}
            </a>
            <LanguageSwitcher />
            <button type="button" className="btn-accent btn-md" onClick={() => openWizard()}>
              {d.nav.bookNow}
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button type="button" className="btn-accent btn-sm" onClick={() => openWizard()}>
              {d.nav.bookNow}
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.03] text-ink"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-label={menu ? d.nav.close : d.nav.menu}
            >
              <Icon name={menu ? 'x' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-night-950/95 backdrop-blur-lg lg:hidden"
          >
            <motion.nav
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="shell flex h-full flex-col justify-center gap-2 pt-16"
              aria-label="Mobile"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setMenu(false)}
                    className={({ isActive }) =>
                      `block py-3 font-display text-4xl uppercase tracking-wide transition-colors ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={SITE.phoneHref} className="btn-ghost btn-md">
                  <Icon name="phone" size={15} />
                  {SITE.phone}
                </a>
                <LanguageSwitcher />
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-dim">
                <span className={`h-2 w-2 rounded-full ${isOpenNow() ? 'bg-emerald-400' : 'bg-red-400'}`} />
                {isOpenNow() ? d.common.openNow : d.common.closedNow} · {d.visitBand.weekdays}{' '}
                {d.visitBand.hoursValue}
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
