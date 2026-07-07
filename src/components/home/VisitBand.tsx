import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { SITE } from '../../lib/site';
import { interpolate, minutesLabel, openStatus, slotLabel } from '../../lib/format';
import { useBooking } from '../BookingContext';
import { Section, Magnetic } from '../ui';
import { Icon } from '../icons';
import { StreetMap } from '../StreetMap';
import { fadeRise, stagger, VIEWPORT } from '../../lib/motion';

/** Live "closes in 2 hrs 10 min" chip that ticks every 30s. */
function HoursPulse() {
  const { d, lang } = useI18n();
  const [, tick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => tick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const st = openStatus(SITE.hours);
  const t = minutesLabel(st.minutes, lang);
  let text: string;
  if (st.open) {
    text = interpolate(d.visitBand.closesIn, { t });
  } else if (st.minutes <= 12 * 60) {
    text = interpolate(d.visitBand.opensIn, { t });
  } else {
    const day = st.nextOpen.toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'es' ? 'es-US' : 'en-US', { weekday: 'long' });
    text = interpolate(d.visitBand.opensOn, { day, time: slotLabel(SITE.hours[st.nextOpen.getDay()]?.open ?? 8) });
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
        st.open ? 'bg-emerald-400/15 text-emerald-300' : 'bg-red-400/15 text-red-300'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${st.open ? 'bg-emerald-400 animate-pulse-soft' : 'bg-red-400'}`} />
      {text}
    </span>
  );
}

/** Address block that copies itself — small delight, real utility. */
function CopyAddress() {
  const { d } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.addressLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the address is still readable */
    }
  };

  return (
    <button type="button" onClick={copy} className="group/addr block text-left" title={d.visitBand.copyHint}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dim">
        {d.visitBand.addressLabel}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'ok' : 'hint'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`inline-flex items-center gap-1 text-[0.62rem] font-semibold normal-case tracking-normal ${
              copied ? 'text-emerald-300' : 'text-faint opacity-0 transition-opacity group-hover/addr:opacity-100'
            }`}
          >
            {copied ? (
              <>
                <Icon name="check" size={10} strokeWidth={3} /> {d.visitBand.copied}
              </>
            ) : (
              d.visitBand.copyHint
            )}
          </motion.span>
        </AnimatePresence>
      </p>
      <p className="mt-1 text-sm font-medium text-ink underline decoration-transparent decoration-dotted underline-offset-4 transition group-hover/addr:decoration-accent/60">
        {SITE.address.street}
      </p>
      <p className="text-sm text-dim">
        {SITE.address.city}, {SITE.address.region} {SITE.address.zip}
      </p>
    </button>
  );
}

export function VisitBand() {
  const { d } = useI18n();
  const { openWizard } = useBooking();
  const cardRef = useRef<HTMLDivElement>(null);

  /* pointer-follow spotlight — quiet, expensive */
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Section>
      <div className="shell">
        <motion.div
          ref={cardRef}
          onPointerMove={onMove}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-night-800 via-night-850 to-night-950 p-8 shadow-pop sm:p-12"
        >
          {/* ambient glows + cursor spotlight */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:opacity-100"
            style={{ background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 20%), rgba(255,197,61,0.07), transparent 45%)' }}
          />

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
                  <CopyAddress />
                </div>
                <a href={SITE.phoneHref} className="group flex items-start gap-3">
                  <Icon name="phone" size={19} className="icon-ring mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-dim">{d.visitBand.phoneLabel}</span>
                    <span className="mt-1 block text-sm font-medium text-ink transition-colors group-hover:text-accent">
                      {SITE.phone}
                    </span>
                    <span className="block text-xs text-faint">{d.visitBand.humanLine}</span>
                  </span>
                </a>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Icon name="clock" size={19} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-dim">
                      {d.visitBand.hoursLabel}
                      <HoursPulse />
                    </p>
                    {d.visitBand.hoursLines.map((line, i) => (
                      <p key={line} className={`mt-1 text-sm ${i === d.visitBand.hoursLines.length - 1 ? 'text-dim' : 'text-ink'}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.p variants={fadeRise} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-xs text-dim">
                <Icon name="checkCircle" size={14} className="shrink-0 text-accent" />
                {d.visitBand.amenities}
              </motion.p>
            </div>

            <motion.div variants={fadeRise} className="flex flex-col justify-center gap-3.5 lg:border-l lg:border-line lg:pl-10">
              <Magnetic>
                <button type="button" className="btn-accent btn-lg btn-sheen w-full" onClick={() => openWizard()}>
                  {d.common.bookYourService}
                  <Icon name="arrowRight" size={17} />
                </button>
              </Magnetic>
              <Magnetic strength={0.1}>
                <a href={SITE.directionsUrl} target="_blank" rel="noreferrer" className="btn-ghost btn-lg w-full">
                  <Icon name="pin" size={16} />
                  {d.common.getDirections}
                </a>
              </Magnetic>
              <Magnetic strength={0.1}>
                <a href={SITE.phoneHref} className="btn-ghost btn-lg group w-full">
                  <Icon name="phone" size={16} className="icon-ring" />
                  {SITE.phone}
                </a>
              </Magnetic>
              <p className="text-center text-xs text-faint">{d.common.walkInsWelcome}</p>
            </motion.div>
          </div>

          {/* the human part + the map */}
          <div className="relative mt-10 grid gap-8 border-t border-line pt-9 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            <motion.figure variants={fadeRise} className="flex flex-col justify-center">
              <span aria-hidden="true" className="font-display text-5xl leading-none text-accent/25">“</span>
              <blockquote className="mt-1 max-w-lg text-balance text-base leading-relaxed text-ink/90 sm:text-lg">
                {d.visitBand.note}
              </blockquote>
              <figcaption className="mt-4">
                <span className="text-sm font-semibold text-accent">{d.visitBand.noteSign}</span>
                {/* hand-drawn flourish that sketches itself in */}
                <svg viewBox="0 0 220 18" className="mt-1.5 h-4 w-52 text-accent/70" fill="none" aria-hidden="true">
                  <motion.path
                    d="M4 11 C 40 4, 70 15, 105 9 C 140 3, 160 13, 216 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
                  />
                </svg>
              </figcaption>
            </motion.figure>

            <motion.div variants={fadeRise}>
              <StreetMap compact />
              <p className="mt-2.5 text-center text-xs text-faint">{d.visitBand.mapHint}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
