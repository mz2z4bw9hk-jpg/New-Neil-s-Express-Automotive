# Neil's Express Automotive — Website

A cinematic, trilingual marketing + booking site for **Neil's Express Automotive**, the family-owned,
AAA-approved auto & truck repair shop at 700 S Garfield Ave, Alhambra, CA.

Built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion. No backend required to run —
the booking system and staff console work end-to-end against a swappable browser-storage layer.

## Highlights

- **Cinematic night-drive design** — a hand-drawn animated SVG hero scene (dusk sky, San Gabriel
  ridgelines, glowing taillights) with scroll parallax. Zero image payload above the fold, so the
  hero paints instantly on any connection or device.
- **9-step booking wizard** — service → package → notes → phone → contact → vehicle → transportation
  → date & time → review/confirm. Includes live slot capacity (max 3 vehicles per half-hour),
  estimated service duration, license-plate autocomplete for returning customers, required
  confirmations, an animated confirmation screen with a reference number (`NEA-YYYYMMDD-###`) and an
  **Add to Calendar (.ics)** download.
- **Staff console** at `/admin` — stats tiles, status workflow (Pending → Confirmed → In Service →
  Completed / Cancelled), filters + search, booking detail drawer with admin notes, CSV export, and
  a Messages inbox fed by the contact form. Demo sign-in: `admin` / `garfield700`.
- **Trilingual**: English, Español, 中文 — every page and the entire wizard, with locale-prefixed
  URLs (`/en`, `/es`, `/zh`), browser-language detection and a persistent switcher.
- **Motion done right** — scroll reveals, staggered cards, counter animations, marquee, step
  transitions; everything honors `prefers-reduced-motion`.
- **SEO & sharing** — LocalBusiness (AutoRepair) JSON-LD, Open Graph card, per-locale titles and
  descriptions, robots.txt, SPA fallbacks for Netlify (`_redirects`) and GitHub Pages (`404.html`).
- **Live "Open now" logic** everywhere hours appear (Mon–Sat 8–6, closed Sunday).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Deploying

The build is fully static.

- **Netlify / Vercel / Cloudflare Pages**: point at the repo, build command `npm run build`,
  output `dist`. SPA fallback for Netlify is already included (`public/_redirects`).
- **GitHub Pages** (project page under a sub-path):
  `npm run build -- --base=/<repo-name>/` then publish `dist/`. The postbuild step copies
  `index.html` to `404.html` so deep links work.

## Where things live

```
src/
  lib/
    site.ts            ← business facts (address, phone, hours, rating) — edit here first
    services.ts        ← service catalog: durations, icons, wizard option ids
    i18n/en|es|zh.ts   ← all copy, typed against the English dictionary
    bookingStore.ts    ← demo persistence layer (localStorage) — swap for a real API here
    ics.ts             ← calendar-file generation
  components/
    home/…             ← hero (SVG scene), marquee, services grid, process, stats, testimonials
    wizard/…           ← the 9-step booking flow
  pages/               ← Home, Services, About, Visit, 404
  admin/               ← staff console (login + dashboard), code-split from the public site
```

### Going live with a real backend

Every read/write goes through `src/lib/bookingStore.ts`. Replace those function bodies with
`fetch()` calls (the admin console and wizard consume only this module) and swap the demo login in
`src/admin/AdminApp.tsx` for real auth. Nothing else changes.

## Content provenance

- Address, phone, hours, AAA approval + member discount, RepairPal certification, 4.9★ rating,
  50+ years family-owned, hybrid service and courtesy shuttle come from the shop's public listings
  (Yelp, AAA, RepairPal, CARFAX) as of mid-2026 — verify before launch.
- **Testimonial quotes are illustrative** (written to represent themes in public reviews) — replace
  with real customer quotes in `src/lib/i18n/*.ts` (`testimonials.items`) before going live.
- Review/rating counts change over time; update `reviewCount` in `src/lib/site.ts`.

## Sample data

On first load the staff console seeds a handful of sample bookings (flagged "sample data" in the
detail view) so the dashboard demos well. "Reset sample data" at the bottom of the console clears
everything, including your test bookings.
