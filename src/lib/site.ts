/**
 * Single source of truth for business facts.
 * Sourced from Castro Auto Repair Service's public listings (Yelp / Birdeye /
 * AutoTechIQ / Yahoo Local) — verify details with the shop before launch.
 * Update here and the whole site follows.
 */
export const SITE = {
  name: 'Castro Auto Repair',
  legalName: 'Castro Auto Repair Service',
  ownerName: 'Juan Castro',
  phone: '(626) 434-0913',
  phoneHref: 'tel:+16264340913',
  address: {
    street: '9844 Garvey Ave',
    city: 'El Monte',
    region: 'CA',
    zip: '91733',
  },
  addressLine: '9844 Garvey Ave, El Monte, CA 91733',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Castro+Auto+Repair+Service%2C+9844+Garvey+Ave%2C+El+Monte%2C+CA+91733',
  /** 0 = Sunday … 6 = Saturday. Closed days are null. Split schedule per listings. */
  hours: [
    null,
    { open: 8, close: 19 },
    { open: 8, close: 16 },
    { open: 8, close: 19 },
    { open: 8, close: 16 },
    { open: 8, close: 16 },
    null,
  ] as ({ open: number; close: number } | null)[],
  rating: 4.9,
  reviewCount: 460,
  maxPerSlot: 3,
  bookingPrefix: 'CAR',
} as const;

export type DayHours = (typeof SITE.hours)[number];

export function isOpenNow(now = new Date()): boolean {
  const h = SITE.hours[now.getDay()];
  if (!h) return false;
  const t = now.getHours() + now.getMinutes() / 60;
  return t >= h.open && t < h.close;
}

export function todayHours(now = new Date()): DayHours {
  return SITE.hours[now.getDay()];
}
