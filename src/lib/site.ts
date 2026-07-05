/**
 * Single source of truth for business facts.
 * Sourced from Neil's Express Automotive's public listings (Yelp / AAA / RepairPal).
 * Update here and the whole site follows.
 */
export const SITE = {
  name: "Neil's Express Automotive",
  legalName: "Neil's Express Automotive, Inc.",
  phone: '(626) 281-6250',
  phoneHref: 'tel:+16262816250',
  address: {
    street: '700 S Garfield Ave',
    city: 'Alhambra',
    region: 'CA',
    zip: '91801',
  },
  addressLine: '700 S Garfield Ave, Alhambra, CA 91801',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Neil%27s+Express+Automotive%2C+700+S+Garfield+Ave%2C+Alhambra%2C+CA+91801',
  /** 0 = Sunday … 6 = Saturday. Closed days are null. */
  hours: [
    null,
    { open: 8, close: 18 },
    { open: 8, close: 18 },
    { open: 8, close: 18 },
    { open: 8, close: 18 },
    { open: 8, close: 18 },
    { open: 8, close: 18 },
  ] as ({ open: number; close: number } | null)[],
  rating: 4.9,
  reviewCount: 212,
  yearsInBusiness: '50+',
  maxPerSlot: 3,
  bookingPrefix: 'NEA',
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
