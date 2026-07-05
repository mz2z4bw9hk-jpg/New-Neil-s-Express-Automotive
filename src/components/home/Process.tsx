import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { Section, SectionHeading } from '../ui';
import { fadeRise, stagger, VIEWPORT, EASE } from '../../lib/motion';

export function Process() {
  const { d } = useI18n();

  return (
    <Section className="bg-night-950/50">
      <div className="shell">
        <SectionHeading kicker={d.process.kicker} title={d.process.title} intro={d.process.intro} />

        <div className="relative mt-16">
          {/* connector line draws across as the row enters view */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-gradient-to-r from-accent/70 via-accent/30 to-transparent lg:block"
          />

          <motion.ol
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {d.process.steps.map((step, i) => (
              <motion.li key={step.title} variants={fadeRise} className="relative">
                <div className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border border-accent/25 bg-night-800 shadow-card">
                  <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="pointer-events-none absolute -top-7 left-12 select-none font-display text-[6.5rem] leading-none text-white/[0.04]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </Section>
  );
}
