import { useState } from 'react';
import { ModalShell } from '../components/ui';
import { Icon } from '../components/icons';
import { SERVICES, SLOT_HOURS, VEHICLE_MAKES, VEHICLE_YEARS } from '../lib/services';
import { SITE } from '../lib/site';
import { createBooking, slotTaken, updateBooking } from '../lib/bookingStore';
import { formatPhone, isValidPhone, parseISODate, slotLabel, toISODate } from '../lib/format';
import { en } from '../lib/i18n/en';
import { adminInputCls } from './shared';

/** Counter-side quick entry: a walk-in becomes a confirmed booking in ~20 seconds. */
export function WalkInModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [date, setDate] = useState(toISODate(new Date()));
  const [slot, setSlot] = useState<number | undefined>();
  const [tried, setTried] = useState(false);

  const svc = SERVICES.find((s) => s.id === serviceId)!;
  const dayHours = SITE.hours[parseISODate(date).getDay()];
  const now = new Date();
  const isToday = date === toISODate(now);
  const nowH = now.getHours() + now.getMinutes() / 60;
  const slots = dayHours
    ? SLOT_HOURS.filter((h) => h >= dayHours.open && h <= dayHours.close - 0.5).filter(
        (h) => !(isToday && h < nowH - 0.5),
      )
    : [];

  const valid = firstName.trim() && isValidPhone(phone) && model.trim() && slot !== undefined;

  const submit = () => {
    if (!valid) {
      setTried(true);
      return;
    }
    const b = createBooking({
      serviceId,
      optionId: svc.options[0],
      notes: 'Walk-in — created at the counter.',
      phone,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: '',
      vehicleYear: year,
      vehicleMake: make,
      vehicleModel: model.trim(),
      plate: plate.trim().toUpperCase(),
      transport: 'wait',
      date,
      slot: slot!,
      durationMin: svc.duration,
    });
    updateBooking(b.id, { status: 'confirmed' });
    onClose();
  };

  const field = (label: string, node: React.ReactNode, span = false) => (
    <div className={span ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">{label}</label>
      {node}
    </div>
  );

  return (
    <ModalShell onClose={onClose} labelledBy="walkin-title" wide>
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 sm:px-8">
        <div>
          <h2 id="walkin-title" className="text-lg font-bold text-ink">Add walk-in</h2>
          <p className="mt-0.5 text-xs text-dim">Creates a confirmed booking on the spot.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line text-dim transition hover:text-ink">
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="grid flex-1 gap-4 overflow-y-auto scrollbar-slim px-6 py-5 sm:grid-cols-2 sm:px-8">
        {field('First name *', <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${adminInputCls} w-full`} />)}
        {field('Last name', <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${adminInputCls} w-full`} />)}
        {field(
          'Phone *',
          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(626) 555-0123"
            className={`${adminInputCls} w-full ${tried && !isValidPhone(phone) ? 'border-red-400/60' : ''}`}
            inputMode="tel"
          />,
        )}
        {field(
          'Service *',
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value as typeof serviceId)} className={`${adminInputCls} w-full`}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{en.services[s.id].title}</option>
            ))}
          </select>,
        )}
        {field(
          'Year',
          <select value={year} onChange={(e) => setYear(e.target.value)} className={`${adminInputCls} w-full`}>
            <option value="">—</option>
            {VEHICLE_YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>,
        )}
        {field(
          'Make',
          <select value={make} onChange={(e) => setMake(e.target.value)} className={`${adminInputCls} w-full`}>
            <option value="">—</option>
            {VEHICLE_MAKES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>,
        )}
        {field('Model *', <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Civic, C300…" className={`${adminInputCls} w-full ${tried && !model.trim() ? 'border-red-400/60' : ''}`} />)}
        {field('Plate', <input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} className={`${adminInputCls} w-full uppercase tracking-widest`} />)}
        {field('Date', <input type="date" value={date} min={toISODate(new Date())} onChange={(e) => { setDate(e.target.value); setSlot(undefined); }} className={`${adminInputCls} w-full`} />)}
        {field(
          'Time slot *',
          <select
            value={slot ?? ''}
            onChange={(e) => setSlot(e.target.value === '' ? undefined : Number(e.target.value))}
            className={`${adminInputCls} w-full ${tried && slot === undefined ? 'border-red-400/60' : ''}`}
          >
            <option value="">{dayHours ? 'Pick a time…' : 'Closed this day'}</option>
            {slots.map((h) => {
              const left = SITE.maxPerSlot - slotTaken(date, h);
              return (
                <option key={h} value={h} disabled={left <= 0}>
                  {slotLabel(h)} {left <= 0 ? '· full' : `· ${left} open`}
                </option>
              );
            })}
          </select>,
        )}
      </div>

      <div className="flex items-center justify-end gap-2.5 border-t border-line px-6 py-4 sm:px-8">
        <button type="button" className="btn-ghost btn-md" onClick={onClose}>Cancel</button>
        <button type="button" className={`btn-accent btn-md ${valid ? '' : 'opacity-40'}`} onClick={submit}>
          <Icon name="check" size={15} strokeWidth={2.4} />
          Add booking
        </button>
      </div>
    </ModalShell>
  );
}
