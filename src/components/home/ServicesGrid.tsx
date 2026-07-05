import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { SERVICES } from '../../lib/services';
import { minutesLabel } from '../../lib/format';
import { useBooking } from '../BookingContext';
import { Section, SectionHeading } from '../ui';
import { Icon } from '../icons';
import { fadeRise, stagger, VIEWPORT } from '../../lib/motion';

export function ServicesGrid() {
  const { d, lang } = useI18n();
  const { openWizard } = useBooking();

  return (
    <Section id="services">
      <div className="shell">
        <SectionHeading
          kicker={d.servicesSection.kicker}
          title={d.servicesSection.title}
          intro={d.servicesSection.intro}
        />

        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((svc) => {
            const txt = d.services[svc.id];
            return (
              <motion.li key={svc.id} variants={fadeRise}>
                <button
                  type="button"
                  onClick={() => openWizard(svc.id)}
                  className="group card flex h-full w-full flex-col items-start gap-4 p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-pop"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-night-700/60 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                    <Icon name={svc.icon} size={24} />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-ink">{txt.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-dim">{txt.desc}</span>
                  </span>
                  <span className="mt-auto flex w-full items-center justify-between pt-2">
                    <span className="text-xs font-medium text-faint">
                      {d.servicesSection.estimated.replace('{duration}', minutesLabel(svc.duration, lang))}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                      {d.common.bookService}
                      <Icon name="arrowRight" size={13} />
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
