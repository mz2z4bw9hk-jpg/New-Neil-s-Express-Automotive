# Castro Auto Repair Service — Website

A cinematic, trilingual marketing + booking site for **Castro Auto Repair Service**, the
owner-operated shop at 9844 Garvey Ave, El Monte, CA 91733.

Built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion. No backend required to run —
the booking system and staff console work end-to-end against a swappable browser-storage layer.

## Highlights

- **Cinematic night-drive design** — a hand-drawn animated SVG hero scene (dusk sky, San Gabriel
  ridgelines, glowing taillights) with scroll parallax. Zero image payload above the fold, so the
  hero paints instantly on any connection or device.
- **Handcrafted micro-interactions** — cursor-follow spotlight, magnetic CTAs with a light sheen,
  live "closes in 2 hrs 10 min" hours chip, click-to-copy address, a signature flourish that draws
  itself in, and a **street-accurate mini map** of the Garvey Ave / El Monte blocks (I-10, SR-60,
  Rio Hondo, Rosemead Blvd, Santa Anita Ave, Peck Rd) that sketches itself in on scroll.
- **9-step booking wizard** — service → package → notes → phone → contact → vehicle → drop-off
  → date & time → review/confirm. Live slot capacity (max 3 vehicles per half-hour), split-schedule
  aware (Mon/Wed to 7 PM, Tue/Thu/Fri to 4 PM, weekends closed), license-plate autocomplete for
  returning customers, reference numbers (`CAR-YYYYMMDD-###`) and an **Add to Calendar (.ics)** download.
- **Staff console** at `/admin` — a **Today board** (the shop's digital whiteboard with one-tap
  call and one-click status advance), **walk-in quick-add**, **printable work orders**,
  **per-customer visit history**, a **7-day load strip**, filters + search, CSV export, and a
  Messages inbox fed by the contact form. Demo sign-in: `admin` / `garvey9844`.
- **Trilingual**: English, Español, 中文 — every page and the entire wizard, with locale-prefixed
  URLs (`/en`, `/es`, `/zh`), browser-language detection and a persistent switcher.
- **SEO & sharing** — LocalBusiness (AutoRepair) JSON-LD, Open Graph card, per-locale titles and
  descriptions, robots.txt, SPA fallbacks for Netlify (`_redirects`) and GitHub Pages (`404.html`).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Deploying

The build is fully static.

- **GitHub Pages (included)**: `.github/workflows/deploy.yml` builds and publishes on every push
  to the default branch (repo must be public, or private on GitHub Pro with Pages enabled under
  **Settings → Pages → Source: GitHub Actions**).
- **Netlify / Vercel / Cloudflare Pages**: build command `npm run build`, output `dist`.
- **Manual sub-path build**: `npm run build -- --base=/<repo-name>/` then publish `dist/`.

## Where things live

```
src/
  lib/
    site.ts            ← business facts (address, phone, split hours, rating) — edit here first
    services.ts        ← service catalog: durations, icons, wizard option ids
    i18n/en|es|zh.ts   ← all copy, typed against the English dictionary
    bookingStore.ts    ← demo persistence layer (localStorage) — swap for a real API here
    ics.ts             ← calendar-file generation
  components/
    StreetMap.tsx      ← hand-drawn El Monte street map (shared: home band + visit page)
    home/…             ← hero (SVG scene), marquee, services grid, process, stats, visit band
    wizard/…           ← the 9-step booking flow
  pages/               ← Home, Services, About, Visit, 404
  admin/               ← staff console: dashboard, Today board, walk-in modal, work-order print
```

### Going live with a real backend

Every read/write goes through `src/lib/bookingStore.ts`. Replace those function bodies with
`fetch()` calls (the admin console and wizard consume only this module) and swap the demo login in
`src/admin/AdminApp.tsx` for real auth. Nothing else changes.

## Content provenance

- Name, address, phone, hours, ratings (4.9★ / 460+ reviews via Birdeye; 4.5★ on Yelp), services
  (oil, brakes, exhaust & catalytic converters, batteries, A/C, engine service & rebuilds,
  Porsche/Mercedes specialty), owner name (Juan Castro) and amenities (cards, free Wi-Fi,
  accessible entrance) come from the shop's public listings — **verify with the owner before
  launch**, especially the split hours, which vary slightly between sources.
- **Testimonial quotes are illustrative** (written to represent themes in public reviews) — replace
  with real customer quotes in `src/lib/i18n/*.ts` (`testimonials.items`) before going live.
- The street map is hand-drawn at neighborhood scale (real street layout, not GIS-exact).

## Sample data

On first load the staff console seeds a handful of sample bookings (flagged "sample data" in the
detail view) so the dashboard demos well. "Reset sample data" in the console clears everything,
including your test bookings.
