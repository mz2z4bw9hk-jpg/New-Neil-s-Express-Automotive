import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  customerHistory,
  listBookings,
  listMessages,
  markMessageRead,
  resetDemoData,
  updateBooking,
  type Booking,
  type BookingStatus,
} from '../lib/bookingStore';
import { formatDateLong, slotLabel, toISODate } from '../lib/format';
import { Logo } from '../components/Logo';
import { Icon } from '../components/icons';
import { ModalShell } from '../components/ui';
import { ScheduleBoard } from './ScheduleBoard';
import { WalkInModal } from './WalkInModal';
import { printWorkOrder } from './printWorkOrder';
import {
  adminInputCls,
  NEXT_STATUS,
  STATUS_META,
  STATUSES,
  StatusBadge,
  serviceLabel,
  telHref,
  transportLabel,
} from './shared';

function exportCSV(rows: Booking[]): void {
  const esc = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
  const head = ['Reference', 'Status', 'Date', 'Time', 'Customer', 'Phone', 'Email', 'Vehicle', 'Plate', 'Service', 'Drop-off', 'Notes', 'Admin notes'];
  const lines = rows.map((b) =>
    [
      b.ref,
      STATUS_META[b.status].label,
      b.date,
      slotLabel(b.slot),
      `${b.firstName} ${b.lastName}`,
      b.phone,
      b.email,
      `${b.vehicleYear} ${b.vehicleMake} ${b.vehicleModel}`,
      b.plate,
      serviceLabel(b),
      transportLabel(b.transport),
      b.notes,
      b.adminNotes,
    ]
      .map(esc)
      .join(','),
  );
  const blob = new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `castro-bookings-${toISODate(new Date())}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Next 7 days at a glance — click a day to filter the table to it. */
function LoadStrip({ bookings, active, onPick }: { bookings: Booking[]; active: string; onPick: (date: string) => void }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = toISODate(d);
    const count = bookings.filter((b) => b.date === iso && b.status !== 'cancelled').length;
    return {
      iso,
      count,
      dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dom: d.getDate(),
    };
  });
  const max = Math.max(6, ...days.map((d) => d.count));

  return (
    <div className="card mt-6 flex items-end justify-between gap-2 px-5 py-4">
      {days.map((day) => {
        const selected = active === day.iso;
        return (
          <button
            key={day.iso}
            type="button"
            onClick={() => onPick(selected ? '' : day.iso)}
            className="group flex flex-1 flex-col items-center gap-1.5"
            title={`${day.count} booking${day.count === 1 ? '' : 's'}`}
          >
            <span className={`text-[0.65rem] font-bold ${selected ? 'text-accent' : 'text-faint'}`}>{day.count}</span>
            <span className="flex h-14 w-full max-w-9 items-end overflow-hidden rounded-md bg-night-900">
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(6, (day.count / max) * 100)}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-md ${selected ? 'bg-accent' : 'bg-electric/50 group-hover:bg-electric/80'}`}
              />
            </span>
            <span className={`text-[0.65rem] font-semibold uppercase ${selected ? 'text-accent' : 'text-dim'}`}>
              {day.dow} {day.dom}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DetailModal({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [notes, setNotes] = useState(booking.adminNotes);
  const dirty = status !== booking.status || notes !== booking.adminNotes;
  const history = useMemo(() => customerHistory(booking), [booking]);

  const row = (label: string, value: React.ReactNode) => (
    <div className="flex items-baseline justify-between gap-4 py-0.5">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-faint">{label}</dt>
      <dd className="text-right text-sm text-ink">{value || '—'}</dd>
    </div>
  );

  return (
    <ModalShell onClose={onClose} labelledBy="bk-detail" wide>
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 sm:px-8">
        <div>
          <h2 id="bk-detail" className="text-lg font-bold text-ink">Booking details</h2>
          <p className="mt-0.5 font-mono text-xs tracking-wider text-dim">{booking.ref}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line text-dim transition hover:text-ink">
            <Icon name="x" size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-slim px-6 py-5 sm:px-8">
        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="user" size={14} /> Customer
          </h3>
          <dl>
            {row('Name', `${booking.firstName} ${booking.lastName}`)}
            {row(
              'Phone',
              <a href={telHref(booking.phone)} className="font-medium text-accent hover:underline">
                {booking.phone}
              </a>,
            )}
            {row('Email', booking.email)}
          </dl>
        </section>

        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="car" size={14} /> Vehicle
          </h3>
          <dl>
            {row('Vehicle', `${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel}`)}
            {row('Plate', booking.plate && <span className="font-mono tracking-widest">{booking.plate}</span>)}
            {row('Drop-off', transportLabel(booking.transport))}
          </dl>
        </section>

        <section className="rounded-xl border border-line bg-night-900/70 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
            <Icon name="calendarCheck" size={14} /> Appointment
          </h3>
          <dl>
            {row('Date', formatDateLong(booking.date, 'en'))}
            {row('Time', slotLabel(booking.slot))}
            {row('Duration', `${booking.durationMin} min`)}
            {row('Service', serviceLabel(booking))}
          </dl>
          {booking.notes && (
            <p className="mt-2 rounded-lg bg-night-950/70 p-3 text-xs leading-relaxed text-dim">
              <span className="font-bold text-faint">Customer notes: </span>
              {booking.notes}
            </p>
          )}
        </section>

        {history.length > 0 && (
          <section className="rounded-xl border border-line bg-night-900/70 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-electric">
              <Icon name="refresh" size={14} /> Visit history · same phone or plate
            </h3>
            <ul className="space-y-1.5">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-dim">
                    {h.date} · {serviceLabel(h)}
                  </span>
                  <StatusBadge status={h.status} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-xl border border-accent/25 bg-accent/[0.05] p-4">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Icon name="gears" size={14} /> Status management
          </h3>
          <label htmlFor="bk-status" className="mb-1.5 block text-xs font-semibold text-dim">Status</label>
          <select id="bk-status" value={status} onChange={(e) => setStatus(e.target.value as BookingStatus)} className={`${adminInputCls} w-full`}>
            {STATUSES.map((st) => (
              <option key={st} value={st}>{STATUS_META[st].label}</option>
            ))}
          </select>
          <label htmlFor="bk-notes" className="mb-1.5 mt-3 block text-xs font-semibold text-dim">Admin notes</label>
          <textarea
            id="bk-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes…"
            className={`${adminInputCls} w-full resize-none`}
          />
        </section>

        <p className="text-center text-[0.68rem] text-faint">
          Created {new Date(booking.createdAt).toLocaleString()} · Updated {new Date(booking.updatedAt).toLocaleString()}
          {booking.seeded ? ' · sample data' : ''}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2.5 border-t border-line px-6 py-4 sm:px-8">
        <button type="button" className="btn-ghost btn-sm" onClick={() => printWorkOrder(booking)}>
          <Icon name="download" size={13} />
          Print work order
        </button>
        <div className="flex items-center gap-2.5">
          <button type="button" className="btn-ghost btn-md" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn-accent btn-md ${dirty ? '' : 'pointer-events-none opacity-40'}`}
            onClick={() => {
              updateBooking(booking.id, { status, adminNotes: notes });
              onClose();
            }}
          >
            <Icon name="check" size={15} strokeWidth={2.4} />
            Save changes
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<'today' | 'bookings' | 'messages'>('today');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [walkIn, setWalkIn] = useState(false);

  useEffect(() => {
    const onData = () => setTick((t) => t + 1);
    window.addEventListener('car:data', onData);
    return () => window.removeEventListener('car:data', onData);
  }, []);

  const bookings = useMemo(() => listBookings(), [tick]);
  const messages = useMemo(() => listMessages(), [tick]);

  const advance = (b: Booking) => {
    const adv = NEXT_STATUS[b.status];
    if (adv) updateBooking(b.id, { status: adv.next });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (dateFilter && b.date !== dateFilter) return false;
      if (q) {
        const hay = `${b.ref} ${b.firstName} ${b.lastName} ${b.phone} ${b.plate} ${b.vehicleMake} ${b.vehicleModel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [bookings, statusFilter, dateFilter, query]);

  const today = toISODate(new Date());
  const stats = [
    { label: 'Today', value: bookings.filter((b) => b.date === today && b.status !== 'cancelled').length, icon: 'calendarCheck' as const },
    { label: 'Pending', value: bookings.filter((b) => b.status === 'pending').length, icon: 'clock' as const },
    { label: 'In service', value: bookings.filter((b) => b.status === 'inService').length, icon: 'wrench' as const },
    { label: 'Total bookings', value: bookings.length, icon: 'gauge' as const },
  ];

  return (
    <div className="min-h-screen bg-night-950 pb-16">
      {/* top bar */}
      <header className="border-b border-line bg-night-900/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link to="/" className="flex items-center gap-3">
            <Logo compact />
            <span className="hidden text-sm font-bold uppercase tracking-[0.2em] text-dim sm:block">Staff Console</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost btn-sm">View site</Link>
            <button type="button" className="btn-ghost btn-sm" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <h1 className="mt-10 font-display text-3xl uppercase text-ink sm:text-4xl">Shop Console</h1>
        <p className="mt-1 text-sm text-dim">Today’s board, every booking, and customer messages — one screen.</p>

        {/* stats */}
        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={s.icon} size={21} />
              </span>
              <div>
                <p className="font-display text-2xl leading-none text-ink">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-dim">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-line">
          {(['today', 'bookings', 'messages'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative px-4 py-2.5 text-sm font-bold capitalize transition ${
                tab === t ? 'text-accent' : 'text-dim hover:text-ink'
              }`}
            >
              {t === 'today' ? 'Today' : t}
              {t === 'messages' && messages.some((m) => !m.read) && (
                <span className="absolute -right-0.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
              )}
              {tab === t && <motion.span layoutId="admin-tab" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />}
            </button>
          ))}
        </div>

        {tab === 'today' && (
          <ScheduleBoard bookings={bookings} onSelect={setSelected} onAdvance={advance} onWalkIn={() => setWalkIn(true)} />
        )}

        {tab === 'bookings' && (
          <>
            <LoadStrip bookings={bookings} active={dateFilter} onPick={setDateFilter} />

            {/* filters */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | BookingStatus)} className={adminInputCls} aria-label="Filter by status">
                <option value="all">All statuses</option>
                {STATUSES.map((st) => (
                  <option key={st} value={st}>{STATUS_META[st].label}</option>
                ))}
              </select>
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className={adminInputCls} aria-label="Filter by date" />
              <div className="relative min-w-52 flex-1">
                <Icon name="search" size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search customer, phone, ref, plate…"
                  className={`${adminInputCls} w-full pl-10`}
                  aria-label="Search bookings"
                />
              </div>
              <button type="button" className="btn-ghost btn-sm" onClick={() => setWalkIn(true)}>
                <Icon name="user" size={13} />
                Walk-in
              </button>
              <button type="button" className="btn-ghost btn-sm" onClick={() => exportCSV(filtered)}>
                <Icon name="download" size={14} />
                CSV
              </button>
            </div>

            {/* table */}
            <div className="card mt-5 overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                    <th className="px-5 py-3.5 font-bold">Ref</th>
                    <th className="px-5 py-3.5 font-bold">Customer</th>
                    <th className="px-5 py-3.5 font-bold">Date · Time</th>
                    <th className="px-5 py-3.5 font-bold">Vehicle</th>
                    <th className="px-5 py-3.5 font-bold">Service</th>
                    <th className="px-5 py-3.5 font-bold">Status</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-sm text-faint">
                        No bookings match these filters.
                      </td>
                    </tr>
                  )}
                  {filtered.map((b) => {
                    const adv = NEXT_STATUS[b.status];
                    return (
                      <tr key={b.id} className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.025]">
                        <td className="px-5 py-3.5 font-mono text-xs tracking-wider text-dim">{b.ref}</td>
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-ink">
                            {b.firstName} {b.lastName}
                          </p>
                          <a href={telHref(b.phone)} className="text-xs text-faint transition hover:text-accent">{b.phone}</a>
                        </td>
                        <td className="px-5 py-3.5 text-dim">
                          {b.date} <span className="text-faint">·</span> {slotLabel(b.slot)}
                        </td>
                        <td className="px-5 py-3.5 text-dim">
                          {b.vehicleYear} {b.vehicleMake} {b.vehicleModel}
                        </td>
                        <td className="max-w-52 truncate px-5 py-3.5 text-dim">{serviceLabel(b)}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            {adv && (
                              <button type="button" className="btn-ghost btn-sm" onClick={() => advance(b)} title={`Mark ${adv.next}`}>
                                {adv.verb}
                              </button>
                            )}
                            <button type="button" className="btn-ghost btn-sm" onClick={() => setSelected(b)}>
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-xs text-faint">
              Demo data lives in your browser only.{' '}
              <button type="button" className="font-semibold text-dim underline-offset-2 hover:underline" onClick={() => resetDemoData()}>
                Reset sample data
              </button>
            </p>
          </>
        )}

        {tab === 'messages' && (
          <div className="mt-6 space-y-3">
            {messages.length === 0 && (
              <p className="card px-5 py-12 text-center text-sm text-faint">No messages yet — they arrive from the “Visit Us” contact form.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`card p-5 ${m.read ? 'opacity-70' : ''}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-ink">
                    {!m.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" />}
                    {m.name}
                    <span className="ml-2 font-normal text-dim">{m.contact}</span>
                  </p>
                  <p className="text-xs text-faint">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-dim">{m.message}</p>
                {!m.read && (
                  <button type="button" className="btn-ghost btn-sm mt-3" onClick={() => markMessageRead(m.id)}>
                    <Icon name="check" size={13} />
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selected && <DetailModal key={selected.id + selected.updatedAt} booking={selected} onClose={() => setSelected(null)} />}
        {walkIn && <WalkInModal key="walkin" onClose={() => setWalkIn(false)} />}
      </AnimatePresence>
    </div>
  );
}
