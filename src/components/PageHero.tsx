import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../lib/motion';

/** Interior-page header band with the night-drive gradient treatment. */
export function PageHero({ kicker, title, intro, children }: { kicker: string; title: string; intro?: string; children?: ReactNode }) {
  const line = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <div className="relative overflow-hidden border-b border-line bg-night-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 80% at 85% 10%, rgba(91,124,250,0.12) 0%, transparent 60%), radial-gradient(50% 70% at 10% 90%, rgba(255,197,61,0.08) 0%, transparent 55%)',
        }}
      />
      <div className="shell relative pb-16 pt-36 sm:pb-20 sm:pt-44">
        <motion.p {...line(0.05)} className="kicker">
          {kicker}
        </motion.p>
        <motion.h1 {...line(0.15)} className="display-xl mt-4 max-w-3xl text-balance text-ink">
          {title}
        </motion.h1>
        {intro && (
          <motion.p {...line(0.28)} className="mt-6 max-w-2xl text-balance leading-relaxed text-dim sm:text-lg">
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div {...line(0.4)} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
