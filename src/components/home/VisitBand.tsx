import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { SITE, isOpenNow } from '../../lib/site';
import { useBooking } from '../BookingContext';
import { Section } from '../ui';
import { Icon } from '../icons';
import { fadeRise, stagger, VIEWPORT } from '../../lib/motion';

export function VisitBand() {
  const { d } = useI18n();
  const { openWizard } = useBooking();
  const open = isOpenNow();

  return (
    <Section>
      <div className="shell">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-night-800 via-night-850 to-night-950 p-8 shadow-pop sm:p-12"
        >
          {/* glow ornament */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <motion.p variants={fadeRise} className="kicker">
                {d.visitBand.kicker}
              </motion.p>
              <motion.h2 variants={fadeRise} className="display-lg mt-4 text-balance text-ink">
                {d.visitBand.title}
              </motion.h2>

              <motion.div variants={fadeRise} className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Icon name="pin" size={19} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dim">{d.visitBand.addressLabel}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{SITE.address.street}</p>
                    <p className="text-sm text-dim">
                      {SITE.address.city}, {SITE.address.region} {SITE.address.zip}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="phone" size={19} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dim">{d.visitBand.phoneLabel}</p>
                    <a href={SITE.phoneHref} className="mt-1 block text-sm font-medium text-ink hover:text-accent">
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Icon name="clock" size={19} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dim">
                      {d.visitBand.hoursLabel}
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${open ? 'bg-emerald-400/15 text-emerald-300' : 'bg-red-400/15 text-red-300'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {open ? d.common.openNow : d.common.closedNow}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-ink">
                      {d.visitBand.weekdays}: <span className="font-medium">{d.visitBand.hoursValue}</span>
                    </p>
                    <p className="text-sm text-dim">
                      {d.visitBand.sunday}: {d.common.closed}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.p variants={fadeRise} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-xs text-dim">
                <Icon name="shield" size={14} className="shrink-0 text-accent" />
                {d.visitBand.aaa}
              </motion.p>
            </div>

            <motion.div variants={fadeRise} className="flex flex-col justify-center gap-3.5 lg:border-l lg:border-line lg:pl-10">
              <button type="button" className="btn-accent btn-lg w-full" onClick={() => openWizard()}>
                {d.common.bookYourService}
                <Icon name="arrowRight" size={17} />
              </button>
              <a href={SITE.directionsUrl} target="_blank" rel="noreferrer" className="btn-ghost btn-lg w-full">
                <Icon name="pin" size={16} />
                {d.common.getDirections}
              </a>
              <a href={SITE.phoneHref} className="btn-ghost btn-lg w-full">
                <Icon name="phone" size={16} />
                {SITE.phone}
              </a>
              <p className="text-center text-xs text-faint">{d.common.walkInsWelcome}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
