import type { Booking, BookingStatus } from '../lib/bookingStore';
import { en } from '../lib/i18n/en';

export const STATUS_META: Record<BookingStatus, { label: string; cls: string }> = {
  pending: { label: 'Pending', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  confirmed: { label: 'Confirmed', cls: 'bg-electric/15 text-blue-300 border-electric/30' },
  inService: { label: 'In Service', cls: 'bg-purple-400/15 text-purple-300 border-purple-400/30' },
  completed: { label: 'Completed', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-400/15 text-red-300 border-red-400/30' },
};

export const STATUSES = Object.keys(STATUS_META) as BookingStatus[];

/** The natural forward step in the shop workflow, if any. */
export const NEXT_STATUS: Partial<Record<BookingStatus, { next: BookingStatus; verb: string }>> = {
  pending: { next: 'confirmed', verb: 'Confirm' },
  confirmed: { next: 'inService', verb: 'Start' },
  inService: { next: 'completed', verb: 'Finish' },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold ${m.cls}`}>
      {m.label}
    </span>
  );
}

/** Admin console reads service names from the English dictionary. */
export function serviceLabel(b: Booking): string {
  const svc = en.services[b.serviceId as keyof typeof en.services];
  if (!svc) return b.serviceId;
  const opt = (svc.options as Record<string, { label: string }>)[b.optionId];
  return opt ? `${svc.title} — ${opt.label}` : svc.title;
}

export function transportLabel(t: Booking['transport']): string {
  return t === 'wait' ? 'Waiting at shop' : t === 'shuttle' ? 'Shuttle (legacy)' : 'Drop-off';
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}

export const adminInputCls =
  'rounded-xl border border-line bg-night-900 px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none';
