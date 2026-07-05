import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { Section, SectionHeading, Stars } from '../ui';
import { fadeRise, stagger, VIEWPORT } from '../../lib/motion';

export function Testimonials() {
  const { d } = useI18n();

  return (
    <Section className="bg-night-950/50">
      <div className="shell">
        <SectionHeading kicker={d.testimonials.kicker} title={d.testimonials.title} />

        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {d.testimonials.items.map((t) => (
            <motion.li key={t.name} variants={fadeRise} className="card relative flex flex-col p-7">
              <span aria-hidden="true" className="pointer-events-none absolute right-6 top-4 select-none font-display text-7xl leading-none text-accent/10">
                &rdquo;
              </span>
              <Stars value={5} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">“{t.quote}”</blockquote>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-bold text-ink">{t.name}</p>
                <p className="mt-0.5 text-xs text-faint">{t.detail}</p>
              </footer>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 text-center text-xs text-faint">{d.testimonials.note}</p>
      </div>
    </Section>
  );
}
