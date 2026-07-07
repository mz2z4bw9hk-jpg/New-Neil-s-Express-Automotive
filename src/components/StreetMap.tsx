import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import { SITE } from '../lib/site';
import { Icon } from './icons';

/**
 * Hand-drawn street map of the blocks around 9844 Garvey Ave, El Monte —
 * real geography (I-10 north, SR-60 south, Rio Hondo west, Peck Rd east),
 * no map SDK, streets draw themselves in on scroll.
 */
export function StreetMap({ compact = false }: { compact?: boolean }) {
  const { d } = useI18n();
  const reduce = useReducedMotion();

  const draw = (delay: number) => ({
    initial: reduce ? { pathLength: 1 } : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: 'easeInOut' as const },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: reduce ? 0 : delay },
  });

  const label = { fill: '#5E6B7E', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: 2 };

  return (
    <a
      href={SITE.directionsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${SITE.addressLine} — ${d.visitPage.mapCta}`}
      className="group/map relative block overflow-hidden rounded-2xl border border-line bg-[#0B1120] transition-colors duration-300 hover:border-accent/40"
    >
      <svg viewBox="0 0 800 460" className={`w-full ${compact ? 'h-56 sm:h-64' : 'h-auto'}`} preserveAspectRatio="xMidYMid slice" role="img">
        {/* block shading for texture */}
        <motion.g {...fade(0.7)} fill="#101827" opacity="0.8">
          <rect x="150" y="86" width="180" height="88" rx="4" />
          <rect x="360" y="86" width="150" height="88" rx="4" />
          <rect x="540" y="86" width="130" height="88" rx="4" />
          <rect x="150" y="210" width="120" height="90" rx="4" />
          <rect x="300" y="210" width="210" height="90" rx="4" />
          <rect x="540" y="210" width="130" height="90" rx="4" />
          <rect x="300" y="330" width="210" height="60" rx="4" />
        </motion.g>

        {/* I-10 freeway (north) */}
        <motion.path d="M-10 52 C 200 40, 560 64, 810 46" fill="none" stroke="#2C3B5C" strokeWidth="16" strokeLinecap="round" {...draw(0)} />
        <motion.path d="M-10 52 C 200 40, 560 64, 810 46" fill="none" stroke="#0B1120" strokeWidth="2" strokeDasharray="14 18" {...draw(0.15)} />
        <motion.text {...fade(0.9)} x="726" y="34" fontSize="15" fontWeight="700" fill="#8FA1C4" fontFamily="Inter, sans-serif">I-10</motion.text>

        {/* SR-60 Pomona Fwy (south) */}
        <motion.path d="M-10 424 C 240 440, 540 412, 810 430" fill="none" stroke="#2C3B5C" strokeWidth="16" strokeLinecap="round" {...draw(0.1)} />
        <motion.path d="M-10 424 C 240 440, 540 412, 810 430" fill="none" stroke="#0B1120" strokeWidth="2" strokeDasharray="14 18" {...draw(0.25)} />
        <motion.text {...fade(0.9)} x="716" y="414" fontSize="15" fontWeight="700" fill="#8FA1C4" fontFamily="Inter, sans-serif">SR-60</motion.text>

        {/* Rio Hondo channel (west, wavy) */}
        <motion.path d="M96 -10 C 118 90, 78 200, 108 300 C 122 356, 100 420, 108 470" fill="none" stroke="#1E3A50" strokeWidth="13" strokeLinecap="round" {...draw(0.2)} />
        <motion.text {...fade(1)} x="66" y="252" fontSize="12" {...{ ...label }} transform="rotate(-84 66 252)">RIO HONDO</motion.text>

        {/* minor cross street: Klingerman / side streets */}
        <motion.path d="M130 306 H 690" fill="none" stroke="#182338" strokeWidth="6" {...draw(0.45)} />

        {/* Rush St (south of Garvey) */}
        <motion.path d="M120 396 H 810" fill="none" stroke="#243350" strokeWidth="9" {...draw(0.35)} />
        <motion.text {...fade(1)} x="140" y="386" fontSize="12" {...{ ...label }}>RUSH ST</motion.text>

        {/* verticals: Rosemead Blvd, Santa Anita Ave, Peck Rd */}
        <motion.path d="M180 66 V 460" fill="none" stroke="#243350" strokeWidth="9" {...draw(0.3)} />
        <motion.text {...fade(1)} x="192" y="356" fontSize="12" {...{ ...label }} transform="rotate(-90 192 356)">ROSEMEAD BLVD</motion.text>

        <motion.path d="M520 66 V 460" fill="none" stroke="#243350" strokeWidth="9" {...draw(0.4)} />
        <motion.text {...fade(1.05)} x="532" y="352" fontSize="12" {...{ ...label }} transform="rotate(-90 532 352)">SANTA ANITA AVE</motion.text>

        <motion.path d="M688 66 V 460" fill="none" stroke="#243350" strokeWidth="9" {...draw(0.5)} />
        <motion.text {...fade(1.05)} x="700" y="330" fontSize="12" {...{ ...label }} transform="rotate(-90 700 330)">PECK RD</motion.text>

        {/* Durfee Ave diagonal (southeast) */}
        <motion.path d="M560 460 L 810 330" fill="none" stroke="#1F2C48" strokeWidth="8" {...draw(0.55)} />
        <motion.text {...fade(1.1)} x="632" y="416" fontSize="11" {...{ ...label }} transform="rotate(-27 632 416)">DURFEE AVE</motion.text>

        {/* Garvey Ave — the main event */}
        <motion.path d="M-10 190 H 810" fill="none" stroke="#31436B" strokeWidth="13" strokeLinecap="round" {...draw(0.55)} />
        <motion.path d="M-10 190 H 810" fill="none" stroke="#0B1120" strokeWidth="1.6" strokeDasharray="10 16" {...draw(0.7)} />
        <motion.text {...fade(1.15)} x="222" y="178" fontSize="13" fontWeight="700" fill="#8FA1C4" fontFamily="Inter, sans-serif" letterSpacing="3">GARVEY AVE</motion.text>

        {/* the shop pin at 9844 Garvey */}
        <motion.g
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 240, damping: 15, delay: reduce ? 0 : 1.25 }}
          style={{ transformOrigin: '420px 190px' }}
        >
          <circle cx="420" cy="190" r="26" fill="#FFC53D" opacity="0.12">
            {!reduce && <animate attributeName="r" values="18;34;18" dur="2.6s" repeatCount="indefinite" />}
          </circle>
          <circle cx="420" cy="190" r="15" fill="#FFC53D" opacity="0.25" className="transition-opacity group-hover/map:opacity-40" />
          <circle cx="420" cy="190" r="8" fill="#FFC53D" stroke="#1A1400" strokeWidth="2.5" />
          {/* address tag */}
          <g>
            <rect x="336" y="120" width="168" height="34" rx="17" fill="#0D1421" stroke="rgba(255,197,61,0.45)" strokeWidth="1.4" />
            <text x="420" y="142" fontSize="13" fontWeight="700" fill="#EDF1F7" fontFamily="Inter, sans-serif" textAnchor="middle">
              9844 Garvey Ave
            </text>
            <path d="M420 154 l-6 10 h12 Z" fill="#0D1421" stroke="rgba(255,197,61,0.45)" strokeWidth="1.4" />
            <path d="M420 152 l-4.6 8 h9.2 Z" fill="#0D1421" />
          </g>
        </motion.g>

        {/* compass */}
        <motion.g {...fade(1.2)}>
          <circle cx="758" cy="86" r="17" fill="#0D1421" stroke="rgba(154,167,186,0.25)" strokeWidth="1.4" />
          <path d="M758 75 l5 15 -5 -4 -5 4 Z" fill="#FFC53D" />
          <text x="758" y="118" fontSize="11" fontWeight="700" fill="#5E6B7E" fontFamily="Inter, sans-serif" textAnchor="middle">N</text>
        </motion.g>
      </svg>

      {/* hover affordance */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/85 to-transparent px-4 pb-3 pt-8 sm:px-5">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-dim">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
            <Icon name="pin" size={12} />
          </span>
          {d.visitBand.mapTag} · {SITE.address.city}, {SITE.address.region}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-night-900/80 px-3 py-1.5 text-xs font-bold text-accent transition-all duration-300 group-hover/map:border-accent/50 group-hover/map:bg-accent group-hover/map:text-accent-ink">
          <Icon name="external" size={12} />
          {d.visitPage.mapCta}
        </span>
      </div>
    </a>
  );
}
