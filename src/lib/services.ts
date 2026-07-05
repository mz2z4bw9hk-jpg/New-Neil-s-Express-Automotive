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
  | 'tires'
  | 'diagnostics'
  | 'ac'
  | 'battery'
  | 'scheduled'
  | 'hybrid'
  | 'suspension'
  | 'smog'
  | 'transmission'
  | 'fleet';

export const SERVICES: ServiceDef[] = [
  { id: 'oil', icon: 'oil', group: 'maintenance', duration: 45, options: ['conventional', 'fullSynthetic', 'valuePackage'] },
  { id: 'brakes', icon: 'brakes', group: 'tiresBrakes', duration: 90, options: ['inspection', 'padsRotors', 'fluidFlush'] },
  { id: 'tires', icon: 'tire', group: 'tiresBrakes', duration: 60, options: ['rotationBalance', 'newTires', 'alignment'] },
  { id: 'diagnostics', icon: 'scan', group: 'repair', duration: 60, options: ['checkEngine', 'prePurchase', 'electrical'] },
  { id: 'ac', icon: 'snow', group: 'climate', duration: 90, options: ['performanceCheck', 'recharge', 'heaterRepair'] },
  { id: 'battery', icon: 'bolt', group: 'climate', duration: 45, options: ['testReplace', 'starterAlternator', 'wiring'] },
  { id: 'scheduled', icon: 'calendarCheck', group: 'maintenance', duration: 120, options: ['minor30k', 'major60k', 'factory'] },
  { id: 'hybrid', icon: 'leaf', group: 'hybrid', duration: 90, options: ['healthCheck', 'hvBattery', 'hybridService'] },
  { id: 'suspension', icon: 'spring', group: 'repair', duration: 90, options: ['rideCheck', 'shocksStruts', 'steering'] },
  { id: 'smog', icon: 'gauge', group: 'repair', duration: 60, options: ['prep', 'failedRepair', 'readiness'] },
  { id: 'transmission', icon: 'gears', group: 'repair', duration: 90, options: ['fluidService', 'diagnosis', 'clutch'] },
  { id: 'fleet', icon: 'truck', group: 'fleet', duration: 120, options: ['truckRepair', 'fleetMaintenance', 'dot'] },
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

/** Booking time-slot starts, in fractional hours (8:00 AM … 5:30 PM). */
export const SLOT_HOURS: number[] = Array.from({ length: 20 }, (_, i) => 8 + i * 0.5);

export const VEHICLE_YEARS: number[] = Array.from(
  { length: new Date().getFullYear() + 2 - 1980 },
  (_, i) => new Date().getFullYear() + 1 - i,
);

export const VEHICLE_MAKES: string[] = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC',
  'Honda', 'Hyundai', 'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz',
  'Mini', 'Mitsubishi', 'Nissan', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];
