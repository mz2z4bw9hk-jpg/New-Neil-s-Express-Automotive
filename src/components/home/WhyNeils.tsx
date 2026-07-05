import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../lib/i18n';
import { SITE } from '../../lib/site';
import { Section } from '../ui';
import { Icon } from '../icons';
import { fadeRise, stagger, VIEWPORT } from '../../lib/motion';

function Counter({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function WhyNeils() {
  const { d } = useI18n();

  const stats = [
    { node: <Counter to={50} suffix="+" />, label: d.why.statYears },
    { node: <Counter to={SITE.rating} decimals={1} suffix="★" />, label: d.why.statRating },
    { node: <Counter to={SITE.reviewCount} suffix="+" />, label: d.why.statReviews },
    { node: <Counter to={6} />, label: d.why.statDays },
  ];

  return (
    <Section>
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <motion.p variants={fadeRise} className="kicker">
            {d.why.kicker}
          </motion.p>
          <motion.h2 variants={fadeRise} className="display-lg mt-4 text-balance text-ink">
            {d.why.title}
          </motion.h2>
          <motion.p variants={fadeRise} className="mt-5 text-balance leading-relaxed text-dim">
            {d.why.body}
          </motion.p>

          <motion.ul variants={stagger(0.07, 0.15)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-8 space-y-3.5">
            {d.why.points.map((p) => (
              <motion.li key={p} variants={fadeRise} className="flex items-start gap-3 text-sm text-ink/90">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
                {p}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`card p-7 ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
            >
              <p className="font-display text-4xl text-accent sm:text-5xl">{s.node}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-dim">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
