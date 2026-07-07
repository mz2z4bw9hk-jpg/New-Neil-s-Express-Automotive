import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { Section, Reveal } from '../components/ui';
import { Icon } from '../components/icons';
import { StreetMap } from '../components/StreetMap';
import { useI18n } from '../lib/i18n';
import { SITE, isOpenNow } from '../lib/site';
import { saveMessage } from '../lib/bookingStore';
import { interpolate } from '../lib/format';

export default function VisitPage() {
  const { d } = useI18n();
  const open = isOpenNow();
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    saveMessage(String(fd.get('name') ?? ''), String(fd.get('contact') ?? ''), String(fd.get('message') ?? ''));
    setSent(true);
  };

  const inputCls =
    'w-full rounded-xl border border-line bg-night-900 px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition';

  return (
    <>
      <PageHero kicker={d.visitPage.kicker} title={d.visitPage.title} intro={d.visitPage.intro}>
        <div className="flex flex-wrap items-center gap-3">
          <a href={SITE.phoneHref} className="btn-accent btn-md">
            <Icon name="phone" size={15} />
            {SITE.phone}
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-dim">
            <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-red-400'}`} />
            {open ? d.common.openNow : d.common.closedNow} · {d.visitBand.hoursLines[0]}
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div>
              <StreetMap />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-night-800/60 px-5 py-4">
                <p className="text-sm text-dim">
                  <span className="font-semibold text-ink">{SITE.address.street}</span> · {SITE.address.city},{' '}
                  {SITE.address.region} {SITE.address.zip}
                </p>
                <div className="text-right text-xs text-dim">
                  {d.visitBand.hoursLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card p-7">
              <h2 className="display-md text-ink">{d.visitPage.formTitle}</h2>
              <p className="mt-2 text-sm text-dim">{d.visitPage.formIntro}</p>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-7 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center"
                  >
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Icon name="check" size={22} strokeWidth={2.4} />
                    </span>
                    <p className="mt-4 text-sm font-medium text-emerald-200">{d.visitPage.formSent}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" exit={{ opacity: 0 }} className="mt-6 space-y-4" onSubmit={onSubmit}>
                    <div>
                      <label htmlFor="v-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
                        {d.visitPage.fName} *
                      </label>
                      <input id="v-name" name="name" required className={inputCls} autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="v-contact" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
                        {d.visitPage.fContact} *
                      </label>
                      <input id="v-contact" name="contact" required className={inputCls} autoComplete="tel" />
                    </div>
                    <div>
                      <label htmlFor="v-msg" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
                        {d.visitPage.fMessage} *
                      </label>
                      <textarea id="v-msg" name="message" required rows={4} className={`${inputCls} resize-none`} />
                    </div>
                    <button type="submit" className="btn-accent btn-md btn-sheen w-full">
                      {d.visitPage.fSubmit}
                      <Icon name="arrowRight" size={15} />
                    </button>
                    <p className="text-center text-xs text-faint">
                      {interpolate(d.visitPage.formNote, { phone: SITE.phone })}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="shell max-w-3xl">
          <Reveal>
            <h2 className="display-md text-center text-ink">{d.visitPage.faqTitle}</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {d.visitPage.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className={`card overflow-hidden transition-colors ${isOpen ? 'border-accent/40' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm font-bold text-ink">{f.q}</span>
                      <Icon
                        name="chevronDown"
                        size={17}
                        className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-6 pb-5 text-sm leading-relaxed text-dim">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
