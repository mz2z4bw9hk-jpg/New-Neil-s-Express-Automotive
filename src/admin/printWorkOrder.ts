import type { Booking } from '../lib/bookingStore';
import { SITE } from '../lib/site';
import { formatDateLong, slotLabel } from '../lib/format';
import { serviceLabel, transportLabel } from './shared';

/** Opens a clean, printable work-order ticket in a new window. */
export function printWorkOrder(b: Booking): void {
  const esc = (s: string) =>
    s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Work Order ${esc(b.ref)}</title>
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; color: #111; padding: 32px; max-width: 720px; margin: 0 auto; }
  header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #111; padding-bottom: 14px; }
  h1 { font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }
  .muted { color: #555; font-size: 12px; margin-top: 3px; }
  .ref { font-family: ui-monospace, monospace; font-size: 18px; font-weight: 700; text-align: right; }
  section { margin-top: 20px; }
  h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #666; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  td { padding: 4px 0; vertical-align: top; }
  td:first-child { color: #555; width: 160px; }
  .notes { border: 1px solid #ccc; border-radius: 6px; padding: 10px; font-size: 13px; min-height: 40px; }
  .lines div { border-bottom: 1px dotted #999; height: 26px; }
  .sig { display: flex; gap: 40px; margin-top: 36px; }
  .sig div { flex: 1; border-top: 1px solid #111; padding-top: 6px; font-size: 12px; color: #555; }
  @media print { body { padding: 8px; } }
</style>
</head>
<body>
  <header>
    <div>
      <h1>${esc(SITE.legalName)}</h1>
      <p class="muted">${esc(SITE.addressLine)} · ${esc(SITE.phone)}</p>
    </div>
    <div>
      <p class="ref">${esc(b.ref)}</p>
      <p class="muted">Work order</p>
    </div>
  </header>

  <section>
    <h2>Customer</h2>
    <table>
      <tr><td>Name</td><td><strong>${esc(b.firstName)} ${esc(b.lastName)}</strong></td></tr>
      <tr><td>Phone</td><td>${esc(b.phone)}</td></tr>
      ${b.email ? `<tr><td>Email</td><td>${esc(b.email)}</td></tr>` : ''}
    </table>
  </section>

  <section>
    <h2>Vehicle</h2>
    <table>
      <tr><td>Vehicle</td><td><strong>${esc(b.vehicleYear)} ${esc(b.vehicleMake)} ${esc(b.vehicleModel)}</strong></td></tr>
      ${b.plate ? `<tr><td>Plate</td><td style="font-family:ui-monospace,monospace;letter-spacing:2px">${esc(b.plate)}</td></tr>` : ''}
      <tr><td>Drop-off</td><td>${esc(transportLabel(b.transport))}</td></tr>
    </table>
  </section>

  <section>
    <h2>Appointment</h2>
    <table>
      <tr><td>Date</td><td>${esc(formatDateLong(b.date, 'en'))}</td></tr>
      <tr><td>Time</td><td>${esc(slotLabel(b.slot))} · est. ${b.durationMin} min</td></tr>
      <tr><td>Service</td><td><strong>${esc(serviceLabel(b))}</strong></td></tr>
    </table>
  </section>

  <section>
    <h2>Customer notes</h2>
    <div class="notes">${esc(b.notes) || '<span style="color:#999">—</span>'}</div>
  </section>

  <section>
    <h2>Findings / parts / labor</h2>
    <div class="lines"><div></div><div></div><div></div><div></div><div></div></div>
  </section>

  <div class="sig">
    <div>Technician</div>
    <div>Customer approval</div>
  </div>

  <script>window.onload = () => { window.print(); };</script>
</body>
</html>`;

  const w = window.open('', '_blank', 'width=780,height=900');
  if (!w) return;
  w.document.write(html);
  w.document.close();
}
