import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { SITE, isOpenNow, todayHours } from '../../lib/site';
import { useBooking } from '../BookingContext';
import { HeroArt } from './HeroArt';
import { Icon } from '../icons';
import { EASE } from '../../lib/motion';

export function Hero() {
  const { d } = useI18n();
  const { openWizard } = useBooking();
  const open = isOpenNow();
  const hours = todayHours();

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 46 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night-900">
      <HeroArt />

      <div className="shell relative z-10 pb-16 pt-36 sm:pb-24">
        <motion.p
          {...line(0.15)}
          className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-sm"
        >
          <Icon name="shield" size={14} />
          {d.hero.badge}
        </motion.p>

        <h1 className="display-xl max-w-4xl text-ink drop-shadow-[0_4px_24px_rgba(5,8,15,0.8)]">
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(0.25)}>
              {d.hero.titleA}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-accent" {...line(0.38)}>
              {d.hero.titleB}
            </motion.span>
          </span>
        </h1>

        <motion.p {...line(0.52)} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/80 sm:text-lg">
          {d.hero.tagline}
        </motion.p>

        <motion.div {...line(0.64)} className="mt-9 flex flex-wrap items-center gap-3.5">
          <button type="button" className="btn-accent btn-lg" onClick={() => openWizard()}>
            {d.hero.ctaPrimary}
            <Icon name="arrowRight" size={17} />
          </button>
          <a href="#services" className="btn-ghost btn-lg backdrop-blur-sm">
            {d.hero.ctaSecondary}
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-night-900/50 px-4 py-2 text-xs font-medium text-dim backdrop-blur-sm">
            <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-red-400'} ${open ? 'animate-pulse-soft' : ''}`} />
            {open && hours
              ? d.common.openTodayUntil.replace('{time}', '6:00 PM')
              : d.common.closedNow}
          </span>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-6"
        >
          {[
            { v: SITE.yearsInBusiness, l: d.hero.statYears },
            { v: `${SITE.rating}★`, l: d.hero.statRating },
            { v: '6', l: d.hero.statDays },
          ].map((s, i) => (
            <div key={s.l} className={i === 0 ? 'pr-5' : 'px-5'}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-display text-2xl text-ink sm:text-3xl">{s.v}</dd>
              <dd className="mt-1 text-[0.68rem] font-semibold uppercase tracking-wider text-dim">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#services"
        aria-label={d.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{ opacity: { delay: 1.3, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
        className="absolute bottom-7 right-7 z-10 hidden h-11 w-11 place-items-center rounded-full border border-line text-dim transition-colors hover:text-ink sm:grid"
      >
        <Icon name="chevronDown" size={18} />
      </motion.a>
    </section>
  );
}
