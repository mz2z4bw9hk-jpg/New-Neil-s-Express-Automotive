import type { IconName } from '../components/icons';

export type ServiceGroup = 'maintenance' | 'repair' | 'tiresBrakes' | 'climate' | 'hybrid' | 'fleet';

export interface ServiceDef {
  id: ServiceId;
  icon: IconName;
  group: ServiceGroup;
  /** Shop-floor time in minutes, shown as the estimated duration in the wizard. */
  duration: number;
  /** Option ids for wizard step 2 — labels live in the i18n dictionaries. */
  options: string[];
}

export type ServiceId =
  | 'oil'
  | 'brakes'
  | 'diagnostics'
  | 'exhaust'
  | 'ac'
  | 'battery'
  | 'euro'
  | 'rebuild'
  | 'scheduled';

/** Castro's real catalog per public listings: oil, brakes, engine work &
 *  rebuilds, exhaust & catalytic converters, batteries, A/C, and
 *  Porsche / Mercedes-Benz specialty service. */
export const SERVICES: ServiceDef[] = [
  { id: 'oil', icon: 'oil', group: 'maintenance', duration: 45, options: ['conventional', 'fullSynthetic', 'valuePackage'] },
  { id: 'brakes', icon: 'brakes', group: 'tiresBrakes', duration: 90, options: ['inspection', 'padsRotors', 'fluidFlush'] },
  { id: 'diagnostics', icon: 'scan', group: 'repair', duration: 60, options: ['checkEngine', 'prePurchase', 'drivability'] },
  { id: 'exhaust', icon: 'muffler', group: 'repair', duration: 90, options: ['inspection', 'catConverter', 'mufflerPipes'] },
  { id: 'ac', icon: 'snow', group: 'climate', duration: 90, options: ['performanceCheck', 'recharge', 'heaterRepair'] },
  { id: 'battery', icon: 'bolt', group: 'climate', duration: 45, options: ['testReplace', 'starterAlternator', 'wiring'] },
  { id: 'euro', icon: 'sparkle', group: 'hybrid', duration: 90, options: ['euroService', 'euroDiagnostics', 'euroBrakes'] },
  { id: 'rebuild', icon: 'gears', group: 'repair', duration: 120, options: ['evaluation', 'topEnd', 'fullRebuild'] },
  { id: 'scheduled', icon: 'calendarCheck', group: 'maintenance', duration: 120, options: ['minor30k', 'major60k', 'factory'] },
];

export const SERVICE_MAP: Record<ServiceId, ServiceDef> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
) as Record<ServiceId, ServiceDef>;

export const SERVICE_GROUPS: ServiceGroup[] = [
  'maintenance',
  'repair',
  'tiresBrakes',
  'climate',
  'hybrid',
  'fleet',
];

/** Booking time-slot starts, in fractional hours (8:00 AM … 6:30 PM at the latest). */
export const SLOT_HOURS: number[] = Array.from({ length: 22 }, (_, i) => 8 + i * 0.5);

export const VEHICLE_YEARS: number[] = Array.from(
  { length: new Date().getFullYear() + 2 - 1980 },
  (_, i) => new Date().getFullYear() + 1 - i,
);

export const VEHICLE_MAKES: string[] = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC',
  'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz',
  'Mini', 'Mitsubishi', 'Nissan', 'Porsche', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];
