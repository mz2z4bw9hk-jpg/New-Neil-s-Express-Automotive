import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { Section, Reveal } from '../components/ui';
import { Icon } from '../components/icons';
import { useI18n } from '../lib/i18n';
import { SERVICES, SERVICE_GROUPS } from '../lib/services';
import { minutesLabel } from '../lib/format';
import { useBooking } from '../components/BookingContext';
import { fadeRise, stagger, VIEWPORT } from '../lib/motion';

export default function ServicesPage() {
  const { d, lang } = useI18n();
  const { openWizard } = useBooking();

  return (
    <>
      <PageHero kicker={d.servicesPage.kicker} title={d.servicesPage.title} intro={d.servicesPage.intro} />

      <Section>
        <div className="shell space-y-16">
          {SERVICE_GROUPS.map((group) => {
            const items = SERVICES.filter((s) => s.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <Reveal>
                  <h2 className="display-md flex items-center gap-4 text-ink">
                    {d.servicesPage.groups[group]}
                    <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                  </h2>
                </Reveal>

                <motion.ul
                  variants={stagger(0.07)}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="mt-8 grid gap-4 md:grid-cols-2"
                >
                  {items.map((svc) => {
                    const txt = d.services[svc.id];
                    return (
                      <motion.li key={svc.id} variants={fadeRise} className="card group p-6 transition-colors hover:border-accent/40">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-night-700/60 text-accent">
                              <Icon name={svc.icon} size={22} />
                            </span>
                            <div>
                              <h3 className="font-bold text-ink">{txt.title}</h3>
                              <p className="mt-0.5 text-xs text-faint">
                                {d.servicesSection.estimated.replace('{duration}', minutesLabel(svc.duration, lang))}
                              </p>
                            </div>
                          </div>
                          <button type="button" onClick={() => openWizard(svc.id)} className="btn-accent btn-sm shrink-0">
                            {d.common.bookService}
                          </button>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-dim">{txt.desc}</p>
                        <div className="mt-4 border-t border-line pt-4">
                          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-faint">
                            {d.servicesPage.includes}
                          </p>
                          <ul className="mt-2.5 flex flex-wrap gap-2">
                            {svc.options.map((opt) => (
                              <li
                                key={opt}
                                className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-dim"
                              >
                                {(txt.options as Record<string, { label: string }>)[opt].label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            );
          })}

          <Reveal>
            <div className="rounded-3xl border border-electric/30 bg-gradient-to-br from-night-800 to-night-950 p-8 text-center sm:p-12">
              <h2 className="display-md text-ink">{d.servicesPage.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-xl text-balance text-dim">{d.servicesPage.ctaBody}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button type="button" className="btn-accent btn-lg" onClick={() => openWizard('diagnostics')}>
                  {d.common.bookYourService}
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
