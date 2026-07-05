import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Hand-drawn cinematic night-drive scene — pure SVG, zero image payload,
 * so the hero paints instantly on any connection. Layers parallax on scroll.
 */
export function HeroArt() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);
  const ridgeY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 46]);
  const roadY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -30]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className={`h-full w-full ${reduce ? '' : 'animate-slow-zoom'}`}
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070C18" />
            <stop offset="0.45" stopColor="#101A33" />
            <stop offset="0.72" stopColor="#2B2A4E" />
            <stop offset="0.88" stopColor="#6E3F55" />
            <stop offset="1" stopColor="#C47446" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="0.5" cy="1" r="0.75">
            <stop offset="0" stopColor="#FFC53D" stopOpacity="0.75" />
            <stop offset="0.4" stopColor="#FF9A4A" stopOpacity="0.3" />
            <stop offset="1" stopColor="#FF9A4A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ridgeA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1A2440" />
            <stop offset="1" stopColor="#101830" />
          </linearGradient>
          <linearGradient id="ridgeB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#131C33" />
            <stop offset="1" stopColor="#0C1222" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B1120" />
            <stop offset="1" stopColor="#05080F" />
          </linearGradient>
          <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141B2C" />
            <stop offset="1" stopColor="#0A0F1C" />
          </linearGradient>
          <linearGradient id="tailbar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF5A3C" />
            <stop offset="0.5" stopColor="#FF8A3C" />
            <stop offset="1" stopColor="#FF5A3C" />
          </linearGradient>
          <linearGradient id="trailR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FF6A3C" stopOpacity="0" />
            <stop offset="1" stopColor="#FF6A3C" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="trailW" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BFD6FF" stopOpacity="0" />
            <stop offset="1" stopColor="#BFD6FF" stopOpacity="0.55" />
          </linearGradient>
          <filter id="blurS" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="blurM" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <radialGradient id="vignette" cx="0.5" cy="0.42" r="0.85">
            <stop offset="0.55" stopColor="#05080F" stopOpacity="0" />
            <stop offset="1" stopColor="#05080F" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* sky */}
        <motion.g style={{ y: skyY }}>
          <rect x="-40" y="-90" width="1520" height="620" fill="url(#sky)" />
          <ellipse cx="720" cy="470" rx="620" ry="230" fill="url(#sunGlow)" />
          {/* stars */}
          <g fill="#DCE6FF">
            {[
              [90, 60, 1.6, 0.8], [220, 130, 1.1, 0.5], [340, 45, 1.3, 0.7], [455, 170, 1, 0.4],
              [590, 90, 1.5, 0.75], [705, 40, 1.1, 0.5], [830, 120, 1.4, 0.65], [960, 60, 1, 0.45],
              [1080, 150, 1.5, 0.7], [1195, 85, 1.1, 0.5], [1320, 40, 1.6, 0.8], [1400, 140, 1, 0.4],
              [160, 210, 1, 0.35], [520, 230, 1.1, 0.4], [890, 210, 1, 0.35], [1250, 215, 1.1, 0.4],
            ].map(([x, y, r, o], i) => (
              <circle key={i} cx={x} cy={y} r={r} opacity={o} />
            ))}
          </g>
        </motion.g>

        {/* mountains */}
        <motion.g style={{ y: ridgeY }}>
          <path
            d="M-40 470 L120 400 L260 452 L420 368 L560 440 L700 386 L860 448 L1020 372 L1180 442 L1320 398 L1480 460 L1480 560 L-40 560 Z"
            fill="url(#ridgeA)"
          />
          <path
            d="M-40 505 L150 452 L330 500 L520 430 L690 492 L900 438 L1080 498 L1260 450 L1480 502 L1480 600 L-40 600 Z"
            fill="url(#ridgeB)"
          />
        </motion.g>

        {/* ground + road */}
        <motion.g style={{ y: roadY }}>
          <rect x="-40" y="497" width="1520" height="330" fill="url(#ground)" />

          {/* road slab */}
          <path d="M690 508 L750 508 L1010 830 L430 830 Z" fill="url(#asphalt)" />
          <path d="M690 508 L697 508 L455 830 L430 830 Z" fill="#1D2740" opacity="0.9" />
          <path d="M743 508 L750 508 L1010 830 L985 830 Z" fill="#1D2740" opacity="0.9" />
          {/* center dashes */}
          <g fill="#8FA1C4" opacity="0.5">
            <polygon points="719,542 721,542 722,556 718,556" />
            <polygon points="717,584 723,584 725,610 715,610" />
            <polygon points="714,650 726,650 729,694 711,694" />
            <polygon points="709,748 731,748 736,820 704,820" />
          </g>

          {/* light trails */}
          <path d="M700 512 L706 512 L560 830 L470 830 Z" fill="url(#trailW)" opacity="0.5" filter="url(#blurS)" />
          <path d="M735 512 L741 512 L960 830 L868 830 Z" fill="url(#trailR)" opacity="0.55" filter="url(#blurS)" />

          {/* the car — rear three-quarter silhouette */}
          <g>
            <ellipse cx="720" cy="704" rx="150" ry="16" fill="#000" opacity="0.55" filter="url(#blurM)" />
            {/* body */}
            <path
              d="M604 700
                 L604 656 Q604 636 622 630 L640 596 Q648 580 668 578 L772 578 Q792 580 800 596 L818 630 Q836 636 836 656 L836 700 Q836 706 828 706 L612 706 Q604 706 604 700 Z"
              fill="#0B1322"
            />
            {/* cabin glass hint */}
            <path
              d="M652 596 Q658 586 670 585 L770 585 Q782 586 788 596 L797 618 L643 618 Z"
              fill="#152238"
            />
            {/* shoulder highlight */}
            <path d="M622 632 Q720 620 818 632" stroke="#2C3B5C" strokeWidth="2.5" fill="none" opacity="0.8" />
            {/* light bar glow */}
            <rect x="620" y="646" width="200" height="26" rx="13" fill="url(#tailbar)" opacity="0.5" filter="url(#blurM)" className="animate-pulse-soft" />
            <rect x="630" y="650" width="180" height="9" rx="4.5" fill="url(#tailbar)" />
            <rect x="630" y="650" width="180" height="9" rx="4.5" fill="url(#tailbar)" opacity="0.85" filter="url(#blurS)" />
            {/* plate lamp */}
            <rect x="702" y="672" width="36" height="12" rx="2.5" fill="#141E33" />
            {/* wheels */}
            <rect x="606" y="678" width="34" height="28" rx="7" fill="#060A12" />
            <rect x="800" y="678" width="34" height="28" rx="7" fill="#060A12" />
          </g>
        </motion.g>

        {/* atmosphere */}
        <rect x="0" y="0" width="1440" height="810" fill="url(#vignette)" />
      </svg>

      {/* bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night-900" />
    </div>
  );
}
