import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { Section, Reveal, SectionHeading } from '../components/ui';
import { Icon, type IconName } from '../components/icons';
import { useI18n } from '../lib/i18n';
import { SITE } from '../lib/site';
import { useBooking } from '../components/BookingContext';
import { fadeRise, stagger, VIEWPORT } from '../lib/motion';

const VALUE_ICONS: IconName[] = ['chat', 'wrench', 'user'];
const CRED_ICONS: IconName[] = ['shield', 'checkCircle', 'wrench', 'star'];
const TEAM_ICONS: IconName[] = ['chat', 'sparkle', 'gears', 'car'];

export default function AboutPage() {
  const { d } = useI18n();
  const { openWizard } = useBooking();

  return (
    <>
      <PageHero kicker={d.aboutPage.kicker} title={d.aboutPage.title} intro={d.aboutPage.lead} />

      {/* Story rail */}
      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-night-950 p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
              <p className="font-display text-7xl leading-none text-accent">4.9★</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-dim">{d.why.statRating}</p>
              <div className="mt-8 space-y-4 border-t border-line pt-6 text-sm text-dim">
                <p className="flex items-center gap-3">
                  <Icon name="pin" size={16} className="shrink-0 text-accent" /> 9844 Garvey Ave, El Monte
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="sparkle" size={16} className="shrink-0 text-accent" /> Porsche · Mercedes-Benz
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="star" size={16} className="shrink-0 text-accent" /> {SITE.reviewCount}+ reviews
                </p>
              </div>
            </div>
          </Reveal>

          <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="space-y-7">
            {d.aboutPage.story.map((para, i) => (
              <motion.p key={i} variants={fadeRise} className={`leading-relaxed ${i === 0 ? 'text-lg text-ink' : 'text-dim'}`}>
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-night-950/50">
        <div className="shell">
          <SectionHeading kicker={d.aboutPage.kicker} title={d.aboutPage.valuesTitle} />
          <motion.ul variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-12 grid gap-5 md:grid-cols-3">
            {d.aboutPage.values.map((v, i) => (
              <motion.li key={v.title} variants={fadeRise} className="card p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={VALUE_ICONS[i] ?? 'sparkle'} size={23} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{v.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* Credentials */}
      <Section>
        <div className="shell">
          <SectionHeading kicker={d.aboutPage.kicker} title={d.aboutPage.credsTitle} />
          <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.aboutPage.creds.map((c, i) => (
              <motion.li key={c.title} variants={fadeRise} className="card p-6 text-center">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Icon name={CRED_ICONS[i] ?? 'shield'} size={20} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-dim">{c.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* Team roles */}
      <Section className="bg-night-950/50">
        <div className="shell">
          <SectionHeading kicker={d.aboutPage.kicker} title={d.aboutPage.teamTitle} />
          <motion.ul variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.aboutPage.team.map((m, i) => (
              <motion.li key={m.role} variants={fadeRise} className="group card overflow-hidden p-0">
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-night-700/70 to-night-900 transition-colors duration-300 group-hover:from-accent/20">
                  <Icon name={TEAM_ICONS[i] ?? 'user'} size={38} className="text-accent" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-ink">{m.role}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-dim">{m.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-14 text-center">
            <button type="button" className="btn-accent btn-lg" onClick={() => openWizard()}>
              {d.common.bookYourService}
              <Icon name="arrowRight" size={16} />
            </button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
