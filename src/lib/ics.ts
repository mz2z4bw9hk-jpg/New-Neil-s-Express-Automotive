import { SITE } from './site';
import { parseISODate } from './format';

/** Build and download an .ics calendar file for a booked appointment. */
export function downloadICS(opts: {
  ref: string;
  serviceTitle: string;
  date: string;
  slot: number;
  durationMin: number;
}): void {
  const start = parseISODate(opts.date);
  start.setHours(Math.floor(opts.slot), Math.round((opts.slot % 1) * 60), 0, 0);
  const end = new Date(start.getTime() + opts.durationMin * 60_000);

  const stamp = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Neils Express Automotive//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${opts.ref}@neilsexpress`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${opts.serviceTitle} — ${SITE.name}`,
    `DESCRIPTION:Reference ${opts.ref}. Questions? Call ${SITE.phone}.`,
    `LOCATION:${SITE.addressLine}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${opts.ref}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
