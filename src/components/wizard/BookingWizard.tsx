import { useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '../../lib/i18n';
import { SERVICES, SERVICE_MAP, SLOT_HOURS, VEHICLE_MAKES, VEHICLE_YEARS, type ServiceId } from '../../lib/services';
import { SITE } from '../../lib/site';
import {
  formatPhone,
  interpolate,
  isValidEmail,
  isValidPhone,
  minutesLabel,
  parseISODate,
  slotLabel,
  toISODate,
  formatDateLong,
} from '../../lib/format';
import { createBooking, knownCustomers, slotTaken, type Booking } from '../../lib/bookingStore';
import { downloadICS } from '../../lib/ics';
import { Icon } from '../icons';
import { ModalShell } from '../ui';

const TOTAL_STEPS = 9;

interface State {
  serviceId?: ServiceId;
  optionId?: string;
  notes: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  plate: string;
  transport?: 'wait' | 'dropoff';
  date: string;
  slot?: number;
  confirm1: boolean;
  confirm2: boolean;
}

const inputCls =
  'w-full rounded-xl border border-line bg-night-900 px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition';

function OptionCard({
  selected,
  onSelect,
  title,
  desc,
  icon,
  compact = false,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  desc?: string;
  icon?: ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group relative flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? 'border-accent/70 bg-accent/[0.08] shadow-[0_0_0_1px_rgba(255,197,61,0.4)]'
          : 'border-line bg-night-900/60 hover:border-dim/40 hover:bg-night-800'
      } ${compact ? '' : 'sm:p-5'}`}
    >
      {icon && (
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors ${
            selected ? 'border-accent/50 bg-accent text-accent-ink' : 'border-line bg-night-700/60 text-accent'
          }`}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-bold ${selected ? 'text-ink' : 'text-ink/90'}`}>{title}</span>
        {desc && <span className="mt-1 block text-xs leading-relaxed text-dim">{desc}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all ${
          selected ? 'border-accent bg-accent' : 'border-faint/50'
        }`}
      >
        {selected && <Icon name="check" size={11} strokeWidth={3.2} className="text-accent-ink" />}
      </span>
    </button>
  );
}

function StepHead({ icon, title, sub }: { icon: Parameters<typeof Icon>[0]['name']; title: string; sub: string }) {
  return (
    <div className="mb-6 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-electric/40 bg-electric/10 text-electric">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm text-dim">{sub}</p>
    </div>
  );
}

export default function BookingWizard({ preselect, onClose }: { preselect?: ServiceId; onClose: () => void }) {
  const { d, lang } = useI18n();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(preselect ? 2 : 1);
  const [dir, setDir] = useState(1);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [s, setS] = useState<State>({
    serviceId: preselect,
    optionId: undefined,
    notes: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    plate: '',
    transport: undefined,
    date: '',
    slot: undefined,
    confirm1: false,
    confirm2: false,
  });
  const patch = (p: Partial<State>) => setS((prev) => ({ ...prev, ...p }));

  const service = s.serviceId ? SERVICE_MAP[s.serviceId] : undefined;
  const serviceTxt = s.serviceId ? d.services[s.serviceId] : undefined;
  const customers = useMemo(() => knownCustomers(), []);
  const returning = useMemo(
    () => customers.some((c) => c.phone.replace(/\D/g, '') === s.phone.replace(/\D/g, '') && s.phone),
    [customers, s.phone],
  );

  /** Per-step gate for the Next button. */
  const valid = (() => {
    switch (step) {
      case 1: return !!s.serviceId;
      case 2: return !!s.optionId;
      case 3: return true;
      case 4: return isValidPhone(s.phone);
      case 5: return s.firstName.trim().length > 0 && s.lastName.trim().length > 0 && (s.email.trim() === '' || isValidEmail(s.email));
      case 6: return !!s.vehicleYear && !!s.vehicleMake && s.vehicleModel.trim().length > 0;
      case 7: return !!s.transport;
      case 8: return !!s.date && s.slot !== undefined;
      case 9: return s.confirm1 && s.confirm2;
      default: return false;
    }
  })();

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setShowErrors(false);
    setStep(next);
    requestAnimationFrame(() => bodyRef.current?.scrollTo({ top: 0 }));
  };

  const onNext = () => {
    if (!valid) {
      setShowErrors(true);
      return;
    }
    if (step < TOTAL_STEPS) go(step + 1);
    else submit();
  };

  const submit = () => {
    if (!s.serviceId || !s.optionId || !s.transport || s.slot === undefined || !service) return;
    const booking = createBooking({
      serviceId: s.serviceId,
      optionId: s.optionId,
      notes: s.notes.trim(),
      phone: s.phone,
      firstName: s.firstName.trim(),
      lastName: s.lastName.trim(),
      email: s.email.trim(),
      vehicleYear: s.vehicleYear,
      vehicleMake: s.vehicleMake,
      vehicleModel: s.vehicleModel.trim(),
      plate: s.plate.trim().toUpperCase(),
      transport: s.transport,
      date: s.date,
      slot: s.slot,
      durationMin: service.duration,
    });
    setConfirmed(booking);
  };

  /* ---------------- step bodies ---------------- */

  const step1 = (
    <div role="radiogroup" aria-label={d.wizard.s1Title}>
      <StepHead icon="wrench" title={d.wizard.s1Title} sub={d.wizard.s1Sub} />
      <div className="grid gap-2.5 sm:grid-cols-2">
        {SERVICES.map((svc) => (
          <OptionCard
            key={svc.id}
            compact
            selected={s.serviceId === svc.id}
            onSelect={() => patch({ serviceId: svc.id, optionId: undefined })}
            title={d.services[svc.id].title}
            icon={<Icon name={svc.icon} size={20} />}
          />
        ))}
      </div>
    </div>
  );

  const step2 = service && serviceTxt && (
    <div role="radiogroup" aria-label={d.wizard.s2Title}>
      <StepHead
        icon="gears"
        title={interpolate(d.wizard.s2Title, { service: serviceTxt.title })}
        sub={d.wizard.s2Sub}
      />
      <div className="grid gap-2.5">
        {service.options.map((opt) => {
          const o = (serviceTxt.options as Record<string, { label: string; desc: string }>)[opt];
          return (
            <OptionCard
              key={opt}
              selected={s.optionId === opt}
              onSelect={() => patch({ optionId: opt })}
              title={o.label}
              desc={o.desc}
            />
          );
        })}
      </div>
    </div>
  );

  const step3 = (
    <div>
      <StepHead icon="chat" title={d.wizard.s3Title} sub={d.wizard.s3Sub} />
      {serviceTxt && s.optionId && (
        <div className="mb-4 rounded-xl border border-line bg-night-900/70 px-4 py-3 text-sm">
          <span className="font-semibold text-dim">{d.wizard.s3Selected} </span>
          <span className="text-ink">
            {serviceTxt.title} → {(serviceTxt.options as Record<string, { label: string }>)[s.optionId]?.label}
          </span>
        </div>
      )}
      <label htmlFor="wz-notes" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
        {d.wizard.s3Label} ({d.common.optional})
      </label>
      <textarea
        id="wz-notes"
        rows={4}
        maxLength={600}
        value={s.notes}
        onChange={(e) => patch({ notes: e.target.value })}
        placeholder={d.wizard.s3Placeholder}
        className={`${inputCls} resize-none`}
      />
      <p className="mt-1.5 text-right text-xs text-faint">{interpolate(d.wizard.s3Chars, { count: s.notes.length })}</p>
      <div className="mt-4 rounded-xl border border-electric/25 bg-electric/[0.07] p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
          <Icon name="sparkle" size={13} />
          {d.wizard.s3TipsTitle}
        </p>
        <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-dim">
          {d.wizard.s3Tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-electric">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const step4 = (
    <div className="mx-auto max-w-sm">
      <StepHead icon="phone" title={d.wizard.s4Title} sub={d.wizard.s4Sub} />
      <label htmlFor="wz-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
        {d.wizard.s4Label} *
      </label>
      <input
        id="wz-phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={s.phone}
        onChange={(e) => patch({ phone: formatPhone(e.target.value) })}
        placeholder="(626) 555-0123"
        className={`${inputCls} text-center text-lg tracking-wide`}
        aria-invalid={showErrors && !isValidPhone(s.phone)}
      />
      <p className={`mt-1.5 text-xs ${showErrors && !isValidPhone(s.phone) ? 'font-semibold text-red-400' : 'text-faint'}`}>
        {showErrors && !isValidPhone(s.phone) ? d.wizard.s4Error : d.wizard.s4Help}
      </p>
      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-line bg-night-900/70 p-3.5 text-xs leading-relaxed text-dim">
        <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-accent" />
        {d.wizard.s4Privacy}
      </div>
    </div>
  );

  const step5 = (
    <div className="mx-auto max-w-sm">
      <StepHead icon="user" title={d.wizard.s5Title} sub={d.wizard.s5Sub} />
      <div className="space-y-4">
        <div>
          <label htmlFor="wz-first" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
            {d.wizard.s5First} *
          </label>
          <input id="wz-first" autoComplete="given-name" value={s.firstName} onChange={(e) => patch({ firstName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label htmlFor="wz-last" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
            {d.wizard.s5Last} *
          </label>
          <input id="wz-last" autoComplete="family-name" value={s.lastName} onChange={(e) => patch({ lastName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label htmlFor="wz-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
            {d.wizard.s5Email} ({d.common.optional})
          </label>
          <input
            id="wz-email"
            type="email"
            autoComplete="email"
            value={s.email}
            onChange={(e) => patch({ email: e.target.value })}
            placeholder="you@example.com"
            className={inputCls}
            aria-invalid={showErrors && s.email !== '' && !isValidEmail(s.email)}
          />
          <p className={`mt-1.5 text-xs ${showErrors && s.email !== '' && !isValidEmail(s.email) ? 'font-semibold text-red-400' : 'text-faint'}`}>
            {showErrors && s.email !== '' && !isValidEmail(s.email) ? d.wizard.s5EmailError : d.wizard.s5EmailHelp}
          </p>
        </div>
      </div>
    </div>
  );

  const plateMatches = s.plate.trim().length >= 2
    ? customers.filter((c) => c.plate.startsWith(s.plate.trim().toUpperCase()) && c.plate !== s.plate.trim().toUpperCase()).slice(0, 5)
    : [];

  const step6 = (
    <div className="mx-auto max-w-sm">
      <StepHead
        icon="car"
        title={interpolate(returning ? d.wizard.s6TitleReturning : d.wizard.s6Title, { name: s.firstName || '—' })}
        sub={d.wizard.s6Sub}
      />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="wz-year" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
              {d.wizard.s6Year} *
            </label>
            <select id="wz-year" value={s.vehicleYear} onChange={(e) => patch({ vehicleYear: e.target.value })} className={inputCls}>
              <option value="">{d.wizard.s6YearPh}</option>
              {VEHICLE_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="wz-make" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
              {d.wizard.s6Make} *
            </label>
            <select id="wz-make" value={s.vehicleMake} onChange={(e) => patch({ vehicleMake: e.target.value })} className={inputCls}>
              <option value="">{d.wizard.s6MakePh}</option>
              {VEHICLE_MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="wz-model" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
            {d.wizard.s6Model} *
          </label>
          <input id="wz-model" value={s.vehicleModel} onChange={(e) => patch({ vehicleModel: e.target.value })} placeholder={d.wizard.s6ModelPh} className={inputCls} />
        </div>
        <div className="relative">
          <label htmlFor="wz-plate" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
            {d.wizard.s6Plate} ({d.common.optional})
          </label>
          <input
            id="wz-plate"
            value={s.plate}
            onChange={(e) => patch({ plate: e.target.value.toUpperCase() })}
            placeholder="ABC 1234"
            className={`${inputCls} uppercase tracking-widest`}
            autoComplete="off"
          />
          <p className="mt-1.5 text-xs text-faint">{d.wizard.s6PlateHelp}</p>
          {/* returning-vehicle autocomplete, like the reference build */}
          <AnimatePresence>
            {plateMatches.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-line bg-night-800 shadow-pop"
              >
                {plateMatches.map((c) => (
                  <li key={c.plate}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-ink transition hover:bg-white/5"
                      onClick={() =>
                        patch({
                          plate: c.plate,
                          vehicleYear: c.vehicleYear,
                          vehicleMake: c.vehicleMake,
                          vehicleModel: c.vehicleModel,
                        })
                      }
                    >
                      <span className="font-mono tracking-widest">{c.plate}</span>
                      <span className="text-xs text-faint">
                        {c.vehicleYear} {c.vehicleMake} {c.vehicleModel}
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const step7 = (
    <div role="radiogroup" aria-label={d.wizard.s7Title} className="mx-auto max-w-md">
      <StepHead icon="key" title={d.wizard.s7Title} sub={d.wizard.s7Sub} />
      <div className="grid gap-2.5">
        {(Object.keys(d.wizard.s7Options) as Array<'wait' | 'dropoff'>).map((key) => (
          <OptionCard
            key={key}
            selected={s.transport === key}
            onSelect={() => patch({ transport: key })}
            title={d.wizard.s7Options[key].label}
            desc={d.wizard.s7Options[key].desc}
            icon={<Icon name={key === 'wait' ? 'clock' : 'key'} size={19} />}
          />
        ))}
      </div>
    </div>
  );

  /* step 8 helpers — the shop runs a split schedule, so slots follow the day's hours */
  const today = new Date();
  const minDate = toISODate(today);
  const maxD = new Date();
  maxD.setDate(maxD.getDate() + 45);
  const dayHours = s.date ? SITE.hours[parseISODate(s.date).getDay()] : null;
  const isClosedDay = !!s.date && !dayHours;
  const daySlots = dayHours
    ? SLOT_HOURS.filter((h) => h >= dayHours.open && h <= dayHours.close - 0.5)
    : [];
  const isToday = s.date === minDate;
  const nowH = today.getHours() + today.getMinutes() / 60;

  const step8 = (
    <div>
      <StepHead icon="calendarCheck" title={d.wizard.s8Title} sub={d.wizard.s8Sub} />

      {service && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-electric/25 bg-electric/[0.07] p-4">
          <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-electric" />
          <div className="text-sm">
            <p className="font-bold text-ink">{d.wizard.s8DurationTitle}</p>
            <p className="mt-0.5 text-dim">
              {interpolate(d.wizard.s8DurationBody, { duration: minutesLabel(service.duration, lang) })}
            </p>
          </div>
        </div>
      )}

      <label htmlFor="wz-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
        <Icon name="calendarCheck" size={12} className="mr-1 inline" />
        {d.wizard.s8Date} *
      </label>
      <input
        id="wz-date"
        type="date"
        min={minDate}
        max={toISODate(maxD)}
        value={s.date}
        onChange={(e) => patch({ date: e.target.value, slot: undefined })}
        className={inputCls}
      />

      {isClosedDay && (
        <p className="mt-3 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <Icon name="clock" size={15} className="shrink-0" />
          {d.wizard.s8Closed}
        </p>
      )}

      {s.date && !isClosedDay && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dim">{d.wizard.s8Slots} *</p>
          <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto pr-1 scrollbar-slim sm:grid-cols-4">
            {daySlots.map((h) => {
              const taken = slotTaken(s.date, h);
              const left = SITE.maxPerSlot - taken;
              const past = isToday && h <= nowH;
              const disabled = left <= 0 || past;
              const sel = s.slot === h;
              return (
                <button
                  key={h}
                  type="button"
                  disabled={disabled}
                  onClick={() => patch({ slot: h })}
                  className={`rounded-xl border px-2 py-2.5 text-center transition-all ${
                    sel
                      ? 'border-accent bg-accent text-accent-ink shadow-glow'
                      : disabled
                        ? 'cursor-not-allowed border-line bg-night-900/40 text-faint/60'
                        : 'border-line bg-night-900/70 text-ink hover:border-accent/50'
                  }`}
                >
                  <span className="block text-sm font-bold">{slotLabel(h)}</span>
                  <span className={`block text-[0.65rem] font-medium ${sel ? 'text-accent-ink/80' : disabled ? '' : 'text-emerald-300'}`}>
                    {left <= 0 ? d.wizard.s8Full : interpolate(d.wizard.s8SpotsLeft, { count: left })}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-faint">{interpolate(d.wizard.s8SlotNote, { max: SITE.maxPerSlot })}</p>
        </div>
      )}
    </div>
  );

  /* step 9 */
  const endLabel = (() => {
    if (s.slot === undefined || !service) return '';
    return slotLabel(s.slot + service.duration / 60);
  })();

  const reviewRow = (label: string, value: ReactNode) => (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-faint">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{value}</span>
    </div>
  );

  const step9 = service && serviceTxt && s.slot !== undefined && (
    <div>
      <StepHead icon="checkCircle" title={d.wizard.s9Title} sub={`${s.firstName} ${s.lastName} · ${s.phone}`} />
      <div className="space-y-3">
        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="calendarCheck" size={14} /> {d.wizard.s9Appointment}
          </h4>
          {reviewRow(d.wizard.s8Date, formatDateLong(s.date, lang))}
          {reviewRow(d.wizard.s9Start, slotLabel(s.slot))}
          {reviewRow(d.wizard.s9Duration, minutesLabel(service.duration, lang))}
          {reviewRow(d.wizard.s9Done, `≈ ${endLabel}`)}
        </section>

        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="car" size={14} /> {d.wizard.s9Vehicle}
          </h4>
          {reviewRow(d.wizard.s9Vehicle, `${s.vehicleYear} ${s.vehicleMake} ${s.vehicleModel}`)}
          {s.plate && reviewRow(d.wizard.s9PlateLabel, <span className="font-mono tracking-widest">{s.plate}</span>)}
          {reviewRow(d.wizard.s9Transport, s.transport ? d.wizard.s7Options[s.transport].label : '')}
        </section>

        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="wrench" size={14} /> {d.wizard.s9Services}
          </h4>
          <p className="text-sm font-medium text-ink">
            {serviceTxt.title}
            <span className="mx-2 text-faint">→</span>
            {(serviceTxt.options as Record<string, { label: string }>)[s.optionId!]?.label}
          </p>
          {s.notes && <p className="mt-2 border-t border-line pt-2 text-xs leading-relaxed text-dim">{s.notes}</p>}
        </section>

        <section className="rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
          <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Icon name="shield" size={14} /> {d.wizard.s9ConfirmTitle}
          </h4>
          {[
            {
              key: 'confirm1' as const,
              label: interpolate(d.wizard.s9Confirm1, { time: slotLabel(s.slot), date: formatDateLong(s.date, lang) }),
            },
            { key: 'confirm2' as const, label: d.wizard.s9Confirm2 },
          ].map((c) => (
            <label key={c.key} className="mb-2 flex cursor-pointer items-start gap-3 text-sm text-ink/90 last:mb-0">
              <input
                type="checkbox"
                checked={s[c.key]}
                onChange={(e) => patch({ [c.key]: e.target.checked } as Partial<State>)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-faint/60 bg-transparent transition checked:border-accent checked:bg-accent"
              />
              <span className="leading-snug">{c.label}</span>
            </label>
          ))}
        </section>
      </div>
    </div>
  );

  const bodies: Record<number, ReactNode> = {
    1: step1, 2: step2, 3: step3, 4: step4, 5: step5, 6: step6, 7: step7, 8: step8, 9: step9,
  };

  /* ---------------- confirmation ---------------- */

  if (confirmed) {
    const svcTitle = d.services[confirmed.serviceId].title;
    return (
      <ModalShell onClose={onClose} labelledBy="wz-success-title">
        <div className="overflow-y-auto p-8 text-center sm:p-10">
          <motion.span
            initial={reduce ? {} : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"
          >
            <svg viewBox="0 0 52 52" className="h-11 w-11">
              <motion.path
                d="M14 27.5 22.5 36 38 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? {} : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
              />
            </svg>
          </motion.span>

          <h2 id="wz-success-title" className="mt-6 text-2xl font-bold text-ink">
            {interpolate(d.wizard.successTitle, { name: confirmed.firstName })}
          </h2>

          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-faint">{d.wizard.successRef}</p>
          <p className="mx-auto mt-2 inline-block rounded-xl border border-accent/40 bg-accent/10 px-5 py-2 font-mono text-lg font-bold tracking-widest text-accent">
            {confirmed.ref}
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-line bg-night-900/70 p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-electric">{d.wizard.successWhen}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{formatDateLong(confirmed.date, lang)}</p>
            <p className="text-sm text-dim">
              {slotLabel(confirmed.slot)} · {svcTitle}
            </p>
            <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-dim">
              {interpolate(d.wizard.successBody, { phone: confirmed.phone })}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="btn-ghost btn-md"
              onClick={() =>
                downloadICS({
                  ref: confirmed.ref,
                  serviceTitle: svcTitle,
                  date: confirmed.date,
                  slot: confirmed.slot,
                  durationMin: confirmed.durationMin,
                })
              }
            >
              <Icon name="download" size={15} />
              {d.wizard.successCalendar}
            </button>
            <button type="button" className="btn-accent btn-md" onClick={onClose}>
              {d.wizard.successDone}
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  /* ---------------- shell ---------------- */

  return (
    <ModalShell onClose={onClose} labelledBy="wz-title" wide>
      {/* header */}
      <div className="border-b border-line px-6 pb-4 pt-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="wz-title" className="text-lg font-bold text-ink">{d.wizard.title}</h2>
            <p className="mt-0.5 text-xs text-dim">
              {interpolate(d.wizard.stepLabel, { current: step, total: TOTAL_STEPS, name: d.wizard.stepNames[step - 1] })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={d.common.close}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-dim transition hover:border-dim/50 hover:text-ink"
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-night-700/70" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={step}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-electric to-accent"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
        </div>
      </div>

      {/* body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto scrollbar-slim px-6 py-6 sm:px-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 44 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -44 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {bodies[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
        <button type="button" className="text-sm font-medium text-dim transition hover:text-ink" onClick={onClose}>
          {d.common.cancel}
        </button>
        <div className="flex items-center gap-2.5">
          {!valid && showErrors && step !== 4 && step !== 5 && (
            <span className="hidden text-xs font-medium text-red-300 sm:block">{d.wizard.selectHint}</span>
          )}
          {step > 1 && (
            <button type="button" className="btn-ghost btn-md" onClick={() => go(step - 1)}>
              {d.common.back}
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className={`btn-md font-bold transition-all ${
              step === TOTAL_STEPS
                ? 'btn rounded-full bg-emerald-500 text-night-950 hover:bg-emerald-400 disabled:opacity-40'
                : 'btn-accent'
            } ${!valid ? 'opacity-40' : ''}`}
            aria-disabled={!valid}
          >
            {step === TOTAL_STEPS ? (
              <>
                <Icon name="check" size={16} strokeWidth={2.6} />
                {d.wizard.s9Submit}
              </>
            ) : (
              <>
                {d.common.next}
                <Icon name="arrowRight" size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
