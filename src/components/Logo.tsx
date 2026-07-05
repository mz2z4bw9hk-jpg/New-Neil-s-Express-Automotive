import { Icon } from './icons';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink shadow-[0_6px_20px_-6px_rgba(255,197,61,0.6)]">
        <Icon name="wrench" size={20} strokeWidth={2} />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-electric ring-2 ring-night-900" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block whitespace-nowrap font-display text-[1.05rem] uppercase tracking-wide text-ink">
            Neil&rsquo;s Express
          </span>
          <span className="mt-1 block whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.3em] text-dim">
            Automotive · Alhambra
          </span>
        </span>
      )}
    </span>
  );
}
