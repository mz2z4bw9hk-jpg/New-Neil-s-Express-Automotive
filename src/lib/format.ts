/** "(626) 281-6250" as the user types; keeps only US 10-digit shapes. */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isValidPhone(raw: string): boolean {
  return raw.replace(/\D/g, '').length === 10;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

/** Local date -> "YYYY-MM-DD" (no UTC drift). */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** "8.5" hours -> "8:30 AM" */
export function slotLabel(hour: number): string {
  const h24 = Math.floor(hour);
  const min = Math.round((hour - h24) * 60);
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(min).padStart(2, '0')} ${ampm}`;
}

export function formatDateLong(iso: string, locale: string): string {
  return parseISODate(iso).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-US' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  );
}

export function minutesLabel(mins: number, locale: string): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (locale === 'zh') {
    if (h && m) return `${h} 小时 ${m} 分钟`;
    if (h) return `${h} 小时`;
    return `${m} 分钟`;
  }
  const hourWord = locale === 'es' ? (h === 1 ? 'hora' : 'horas') : h === 1 ? 'hr' : 'hrs';
  if (h && m) return `${h} ${hourWord} ${m} min`;
  if (h) return `${h} ${hourWord}`;
  return `${m} min`;
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
