import { SITE } from './site';
import { toISODate } from './format';
import type { ServiceId } from './services';

/**
 * Demo persistence layer.
 *
 * Everything below reads/writes localStorage so the whole product — wizard,
 * capacity checks and the admin console — works with zero infrastructure.
 * To go live, replace the bodies of these functions with fetch() calls to a
 * real API; every consumer already goes through this module only.
 */

export type BookingStatus = 'pending' | 'confirmed' | 'inService' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  ref: string;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
  serviceId: ServiceId;
  optionId: string;
  notes: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  plate: string;
  transport: 'wait' | 'dropoff' | 'shuttle';
  date: string; // YYYY-MM-DD
  slot: number; // fractional hour, e.g. 9.5
  durationMin: number;
  adminNotes: string;
  seeded?: boolean;
}

export interface KnownCustomer {
  plate: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
}

export interface ShopMessage {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  message: string;
  read: boolean;
}

const BOOKINGS_KEY = 'nea.bookings.v1';
const MESSAGES_KEY = 'nea.messages.v1';
const SEED_FLAG = 'nea.seeded.v1';

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, rows: T[]): void {
  localStorage.setItem(key, JSON.stringify(rows));
  window.dispatchEvent(new CustomEvent('nea:data'));
}

export function listBookings(): Booking[] {
  seedOnce();
  return read<Booking>(BOOKINGS_KEY).sort((a, b) =>
    a.date === b.date ? a.slot - b.slot : a.date.localeCompare(b.date),
  );
}

export function slotTaken(date: string, slot: number): number {
  return listBookings().filter(
    (b) => b.date === date && b.slot === slot && b.status !== 'cancelled',
  ).length;
}

function nextRef(date = new Date()): string {
  const ymd = toISODate(date).replaceAll('-', '');
  const todays = read<Booking>(BOOKINGS_KEY).filter((b) => b.ref.includes(ymd)).length;
  return `${SITE.bookingPrefix}-${ymd}-${String(todays + 1).padStart(3, '0')}`;
}

export type NewBooking = Omit<
  Booking,
  'id' | 'ref' | 'createdAt' | 'updatedAt' | 'status' | 'adminNotes'
>;

export function createBooking(input: NewBooking): Booking {
  const now = new Date();
  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    ref: nextRef(now),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: 'pending',
    adminNotes: '',
  };
  write(BOOKINGS_KEY, [...read<Booking>(BOOKINGS_KEY), booking]);
  return booking;
}

export function updateBooking(id: string, patch: Partial<Booking>): void {
  const rows = read<Booking>(BOOKINGS_KEY).map((b) =>
    b.id === id ? { ...b, ...patch, updatedAt: new Date().toISOString() } : b,
  );
  write(BOOKINGS_KEY, rows);
}

/** Returning-customer lookup for the wizard's plate autocomplete. */
export function knownCustomers(): KnownCustomer[] {
  const seen = new Map<string, KnownCustomer>();
  for (const b of listBookings()) {
    if (!b.plate) continue;
    seen.set(b.plate.toUpperCase(), {
      plate: b.plate.toUpperCase(),
      firstName: b.firstName,
      lastName: b.lastName,
      phone: b.phone,
      vehicleYear: b.vehicleYear,
      vehicleMake: b.vehicleMake,
      vehicleModel: b.vehicleModel,
    });
  }
  return [...seen.values()];
}

export function saveMessage(name: string, contact: string, message: string): void {
  const rows = read<ShopMessage>(MESSAGES_KEY);
  rows.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    contact,
    message,
    read: false,
  });
  write(MESSAGES_KEY, rows);
}

export function listMessages(): ShopMessage[] {
  return read<ShopMessage>(MESSAGES_KEY).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function markMessageRead(id: string): void {
  write(
    MESSAGES_KEY,
    read<ShopMessage>(MESSAGES_KEY).map((m) => (m.id === id ? { ...m, read: true } : m)),
  );
}

export function resetDemoData(): void {
  localStorage.removeItem(BOOKINGS_KEY);
  localStorage.removeItem(MESSAGES_KEY);
  localStorage.removeItem(SEED_FLAG);
  seedOnce();
}

/** A handful of sample rows so the admin console demos well on first open. */
function seedOnce(): void {
  if (localStorage.getItem(SEED_FLAG)) return;
  localStorage.setItem(SEED_FLAG, '1');

  const day = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return toISODate(d);
  };
  const now = new Date().toISOString();
  const mk = (
    p: Partial<Booking> &
      Pick<Booking, 'ref' | 'status' | 'serviceId' | 'optionId' | 'firstName' | 'lastName' | 'date' | 'slot'>,
  ): Booking => ({
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    notes: '',
    phone: '(626) 555-0136',
    email: '',
    vehicleYear: '2019',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    plate: '',
    transport: 'dropoff',
    durationMin: 60,
    adminNotes: '',
    seeded: true,
    ...p,
  });

  const ymd = (offset: number) => day(offset).replaceAll('-', '');
  const rows: Booking[] = [
    mk({
      ref: `NEA-${ymd(-1)}-001`,
      status: 'completed',
      serviceId: 'oil',
      optionId: 'valuePackage',
      firstName: 'Grace',
      lastName: 'Liu',
      date: day(-1),
      slot: 9,
      durationMin: 45,
      vehicleYear: '2021',
      vehicleMake: 'Lexus',
      vehicleModel: 'RX 350',
      plate: '8KXR442',
      transport: 'wait',
    }),
    mk({
      ref: `NEA-${ymd(0)}-001`,
      status: 'inService',
      serviceId: 'brakes',
      optionId: 'padsRotors',
      firstName: 'Marco',
      lastName: 'Reyes',
      date: day(0),
      slot: 8.5,
      durationMin: 90,
      vehicleYear: '2017',
      vehicleMake: 'Ford',
      vehicleModel: 'F-150',
      plate: '7TRK019',
      transport: 'shuttle',
      notes: 'Squeal from front right when braking downhill.',
    }),
    mk({
      ref: `NEA-${ymd(0)}-002`,
      status: 'confirmed',
      serviceId: 'ac',
      optionId: 'recharge',
      firstName: 'Amy',
      lastName: 'Chen',
      date: day(0),
      slot: 14,
      durationMin: 90,
      vehicleYear: '2020',
      vehicleMake: 'Honda',
      vehicleModel: 'CR-V',
      plate: '8PLM330',
    }),
    mk({
      ref: `NEA-${ymd(1)}-001`,
      status: 'pending',
      serviceId: 'hybrid',
      optionId: 'healthCheck',
      firstName: 'Daniel',
      lastName: 'Nguyen',
      date: day(1),
      slot: 10,
      durationMin: 90,
      vehicleYear: '2018',
      vehicleMake: 'Toyota',
      vehicleModel: 'Prius',
      plate: '6HYB884',
      notes: 'Hybrid warning light came on twice last week.',
    }),
    mk({
      ref: `NEA-${ymd(2)}-001`,
      status: 'pending',
      serviceId: 'smog',
      optionId: 'failedRepair',
      firstName: 'Rosa',
      lastName: 'Martinez',
      date: day(2),
      slot: 11.5,
      vehicleYear: '2012',
      vehicleMake: 'Nissan',
      vehicleModel: 'Altima',
      plate: '5QRT518',
      transport: 'dropoff',
    }),
  ];

  write(BOOKINGS_KEY, rows);
}
