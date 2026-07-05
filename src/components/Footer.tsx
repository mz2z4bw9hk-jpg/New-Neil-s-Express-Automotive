import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { SITE } from '../lib/site';
import { Logo } from './Logo';
import { Icon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useBooking } from './BookingContext';

export function Footer() {
  const { d, lang } = useI18n();
  const { openWizard } = useBooking();
  const year = new Date().getFullYear();

  const popular: { id: Parameters<typeof openWizard>[0]; label: string }[] = [
    { id: 'oil', label: d.services.oil.title },
    { id: 'brakes', label: d.services.brakes.title },
    { id: 'diagnostics', label: d.services.diagnostics.title },
    { id: 'ac', label: d.services.ac.title },
    { id: 'hybrid', label: d.services.hybrid.title },
  ];

  return (
    <footer className="border-t border-line bg-night-950">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to={`/${lang}`} aria-label={SITE.name}>
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim">{d.footer.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['AAA', 'RepairPal', '4.9★'].map((b) => (
              <span
                key={b}
                className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs font-semibold text-dim"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label={d.footer.quickLinks}>
          <h3 className="kicker">{d.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: `/${lang}`, label: d.nav.home },
              { to: `/${lang}/services`, label: d.nav.services },
              { to: `/${lang}/about`, label: d.nav.about },
              { to: `/${lang}/visit`, label: d.nav.visit },
            ].map((l) => (
              <li key={l.to}>
                <Link className="text-dim transition-colors hover:text-ink" to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => openWizard()}
                className="font-semibold text-accent transition-colors hover:text-accent-bright"
              >
                {d.nav.bookNow} →
              </button>
            </li>
          </ul>
        </nav>

        <nav aria-label={d.footer.servicesTitle}>
          <h3 className="kicker">{d.footer.servicesTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {popular.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => openWizard(s.id)}
                  className="text-left text-dim transition-colors hover:text-ink"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="kicker">{d.footer.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-dim">
            <li className="flex gap-2.5">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-accent" />
              <a href={SITE.directionsUrl} target="_blank" rel="noreferrer" className="hover:text-ink">
                {SITE.addressLine}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-accent" />
              <a href={SITE.phoneHref} className="hover:text-ink">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                {d.visitBand.weekdays}: {d.visitBand.hoursValue}
                <br />
                {d.visitBand.sunday}: {d.common.closed}
              </span>
            </li>
          </ul>
          <div className="mt-5">
            <LanguageSwitcher up />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-faint sm:flex-row">
          <p>
            © {year} {SITE.legalName} {d.footer.rights}
          </p>
          <p className="flex items-center gap-4">
            <span>Se habla español · 我们说中文</span>
            <Link to="/admin" className="transition-colors hover:text-dim">
              {d.footer.adminLink}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
