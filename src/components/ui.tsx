import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { fadeRise, stagger, VIEWPORT } from '../lib/motion';

/** Section shell with consistent vertical rhythm. */
export function Section({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = 'center',
}: {
  kicker: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`flex flex-col gap-4 ${alignCls}`}
    >
      <motion.p variants={fadeRise} className="kicker">
        {kicker}
      </motion.p>
      <motion.h2 variants={fadeRise} className="display-lg text-balance text-ink">
        {title}
      </motion.h2>
      {intro && (
        <motion.p variants={fadeRise} className="max-w-2xl text-balance text-base text-dim sm:text-lg">
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Scroll-reveal wrapper — fades content up once when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Locks body scroll while a modal is open. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/** Full-screen modal scaffold shared by the wizard and admin dialogs. */
export function ModalShell({
  onClose,
  labelledBy,
  children,
  wide = false,
}: {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useScrollLock(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="absolute inset-0 bg-night-950/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-night-850 shadow-pop sm:max-h-[86dvh] sm:rounded-3xl ${
          wide ? 'sm:max-w-3xl' : 'sm:max-w-xl'
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Compact star row for ratings. */
export function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(value) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
          <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
        </svg>
      ))}
    </span>
  );
}
