import { motion } from 'framer-motion';
import type { Booking } from '../lib/bookingStore';
import { formatDateLong, slotLabel, toISODate } from '../lib/format';
import { SITE } from '../lib/site';
import { Icon } from '../components/icons';
import { NEXT_STATUS, StatusBadge, serviceLabel, telHref } from './shared';

/**
 * The digital whiteboard: today's cars in time order, one glance,
 * one tap to call, one click to move a job forward.
 */
export function ScheduleBoard({
  bookings,
  onSelect,
  onAdvance,
  onWalkIn,
}: {
  bookings: Booking[];
  onSelect: (b: Booking) => void;
  onAdvance: (b: Booking) => void;
  onWalkIn: () => void;
}) {
  const today = toISODate(new Date());
  const rows = bookings
    .filter((b) => b.date === today && b.status !== 'cancelled')
    .sort((a, b) => a.slot - b.slot);
  const dayHours = SITE.hours[new Date().getDay()];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-ink">{formatDateLong(today, 'en')}</h2>
          <p className="mt-0.5 text-xs text-dim">
            {rows.length} vehicle{rows.length === 1 ? '' : 's'} scheduled
            {dayHours ? ` · doors open ${slotLabel(dayHours.open)} – ${slotLabel(dayHours.close)}` : ' · shop closed today'}
          </p>
        </div>
        <button type="button" className="btn-accent btn-sm" onClick={onWalkIn}>
          <Icon name="user" size={14} />
          Add walk-in
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="card mt-5 px-6 py-14 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
            <Icon name="calendarCheck" size={22} />
          </span>
          <p className="mt-4 text-sm font-semibold text-ink">Nothing on the board yet</p>
          <p className="mt-1 text-xs text-dim">New online bookings land here automatically — or add a walk-in.</p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {rows.map((b, i) => {
            const adv = NEXT_STATUS[b.status];
            return (
              <motion.li
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={`card flex flex-wrap items-center gap-x-5 gap-y-2 p-4 transition-colors hover:border-dim/40 ${
                  b.status === 'completed' ? 'opacity-60' : ''
                }`}
              >
                <div className="w-20 shrink-0">
                  <p className="font-display text-lg leading-none text-accent">{slotLabel(b.slot)}</p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-faint">{b.durationMin} min</p>
                </div>

                <div className="min-w-44 flex-1">
                  <p className="text-sm font-bold text-ink">
                    {b.firstName} {b.lastName}
                    {b.plate && <span className="ml-2 font-mono text-xs font-medium tracking-widest text-faint">{b.plate}</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-dim">
                    {b.vehicleYear} {b.vehicleMake} {b.vehicleModel} · {serviceLabel(b)}
                  </p>
                </div>

                <StatusBadge status={b.status} />

                <div className="ml-auto flex items-center gap-2">
                  <a href={telHref(b.phone)} className="btn-ghost btn-sm" title={`Call ${b.phone}`}>
                    <Icon name="phone" size={13} />
                  </a>
                  {adv && (
                    <button type="button" className="btn-ghost btn-sm" onClick={() => onAdvance(b)} title={`Mark ${adv.next}`}>
                      <Icon name="arrowRight" size={13} />
                      {adv.verb}
                    </button>
                  )}
                  <button type="button" className="btn-ghost btn-sm" onClick={() => onSelect(b)}>
                    Details
                  </button>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
