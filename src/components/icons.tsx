import type { SVGProps } from 'react';

/**
 * In-house 24×24 stroke icon set (1.8px, round caps) so the whole site
 * shares one visual voice — no icon-font or external dependency.
 */
const PATHS = {
  oil: (
    <>
      <path d="M12 3.5c2.8 3.4 5.5 6.6 5.5 10a5.5 5.5 0 1 1-11 0c0-3.4 2.7-6.6 5.5-10Z" />
      <path d="M9.5 14.2a2.6 2.6 0 0 0 2.2 2.6" />
    </>
  ),
  brakes: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 6.2v2M12 15.8v2M6.2 12h2M15.8 12h2" />
    </>
  ),
  tire: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M12 3.5v3.2M12 17.3v3.2M3.5 12h3.2M17.3 12h3.2M6 6l2.3 2.3M15.7 15.7 18 18M18 6l-2.3 2.3M8.3 15.7 6 18" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M7.5 12h2l1.2-3 2.6 6 1.2-3h2" />
    </>
  ),
  snow: (
    <>
      <path d="M12 3v18M12 3l-2.2 2.2M12 3l2.2 2.2M12 21l-2.2-2.2M12 21l2.2-2.2" />
      <path d="M4.2 7.5 19.8 16.5M4.2 7.5 4.4 10.6M4.2 7.5l3-.8M19.8 16.5l-.2-3.1M19.8 16.5l-3 .8" />
      <path d="M19.8 7.5 4.2 16.5M19.8 7.5l-3-.8M19.8 7.5l-.2 3.1M4.2 16.5l3 .8M4.2 16.5l.2-3.1" />
    </>
  ),
  bolt: <path d="M13.5 3 5.5 13.5h5L10.5 21l8-10.5h-5L13.5 3Z" />,
  calendarCheck: (
    <>
      <rect x="4" y="5.5" width="16" height="15" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" />
      <path d="m9.2 15.2 2 2 3.6-3.7" />
    </>
  ),
  leaf: (
    <>
      <path d="M5.5 18.5C4 12 8 5.5 19 5c.6 11-5.5 15-10 13.7" />
      <path d="M5.5 18.5C8 13.5 11.5 10.5 15 9" />
    </>
  ),
  spring: (
    <>
      <path d="M6 20h12M6 4h12" />
      <path d="M8 4c4 1.2 8 2 8 4s-8 2.4-8 4.4 8 2 8 4-4 2.8-8 3.6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 19a8.5 8.5 0 1 1 15 0" />
      <path d="m12 15 4.2-5.8" />
      <circle cx="12" cy="15" r="1.6" />
      <path d="M12 6.5V8M6.5 9.5l1.2 1M17.5 9.5l-1.2 1" />
    </>
  ),
  gears: (
    <>
      <circle cx="9" cy="9.5" r="3" />
      <path d="M9 3.8v2M9 13.2v2M3.8 9.5h2M12.2 9.5h2M5.3 5.8l1.4 1.4M11.3 11.8l1.4 1.4M12.7 5.8l-1.4 1.4M6.7 11.8l-1.4 1.4" />
      <circle cx="16.5" cy="16.5" r="2.4" />
      <path d="M16.5 12.4v1.7M16.5 18.9v1.7M12.4 16.5h1.7M18.9 16.5h1.7" />
    </>
  ),
  muffler: (
    <>
      <rect x="5" y="9" width="13.5" height="7" rx="3.4" />
      <path d="M2.5 12.5H5M18.5 12.5h3" />
      <path d="M9 9v7M13 9v7" opacity="0.6" />
      <path d="M20 9.2v-1M21.5 10v-1.6" opacity="0.7" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v10h-11zM13.5 10h4.2l3.3 3.4v3.1h-3.4" />
      <circle cx="6.5" cy="17.5" r="1.9" />
      <circle cx="16.6" cy="17.5" r="1.9" />
      <path d="M8.4 16.5h6.3" />
    </>
  ),
  phone: (
    <path d="M7.6 3.8 9.4 3c.5-.2 1 0 1.3.5l1.5 2.8c.2.5.1 1-.3 1.4l-1.4 1.2c.8 1.7 2.3 3.3 4 4.2l1.2-1.4c.3-.4.9-.5 1.4-.3l2.8 1.4c.5.3.7.9.5 1.4l-.8 1.9c-.3.6-.9 1-1.5.9-6.4-.6-11.5-5.7-12.1-12.1 0-.7.3-1.3.9-1.6l.7-.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.4 2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.4 12.3 2.4 2.4 4.8-4.9" />
    </>
  ),
  arrowRight: <path d="M4.5 12h15m0 0-6-6m6 6-6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  star: (
    <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5s1.2-6.2 3.6-8.5Z" />
    </>
  ),
  car: (
    <>
      <path d="M4.5 12.5 6 7.8A2 2 0 0 1 7.9 6.4h8.2A2 2 0 0 1 18 7.8l1.5 4.7" />
      <path d="M4 12.5h16a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.4a1 1 0 0 1 1-1Z" />
      <path d="M6.5 15.2h1.6M15.9 15.2h1.6M5 17.9v1.9M19 17.9v1.9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.7" />
      <path d="M5 20c.8-3.4 3.6-5.2 7-5.2s6.2 1.8 7 5.2" />
    </>
  ),
  chat: (
    <path d="M12 4c4.8 0 8.5 3.1 8.5 7.1S16.8 18.2 12 18.2c-.9 0-1.8-.1-2.6-.3L5 20l1-3.5c-1.6-1.3-2.5-3.2-2.5-5.4C3.5 7.1 7.2 4 12 4Z" />
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.4 3 8 7 9.8 4-1.8 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.3" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.2 6.8a4.6 4.6 0 0 1 6-4.4l-3 3 .4 2.4 2.4.4 3-3a4.6 4.6 0 0 1-6.2 5.4" />
      <path d="M14.4 8.2 6.9 15.7" />
      <circle cx="5.6" cy="17" r="2.3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="4" />
      <path d="m11 12.5 8.5-8.5M16.5 7.5l2.5 2.5M13.8 10.2l2 2" />
    </>
  ),
  download: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.7 4.7" />
    </>
  ),
  refresh: (
    <path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L20 9.5m0 0V4.7m0 4.8h-4.8M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4 14.5m0 0v4.8m0-4.8h4.8" />
  ),
  external: <path d="M9 5H5.5A1.5 1.5 0 0 0 4 6.5v12A1.5 1.5 0 0 0 5.5 20h12a1.5 1.5 0 0 0 1.5-1.5V15M14 4h6m0 0v6m0-6-9.5 9.5" />,
  sparkle: (
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9-5.7-1.8L10.2 9 12 3.5ZM19 16.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
  ),
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
  ...rest
}: { name: IconName; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
