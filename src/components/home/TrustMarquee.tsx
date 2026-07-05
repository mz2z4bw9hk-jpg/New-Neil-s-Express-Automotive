import { useI18n } from '../../lib/i18n';
import { Icon } from '../icons';

export function TrustMarquee() {
  const { d } = useI18n();
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {d.marquee.map((item) => (
        <li key={item} className="flex items-center gap-3 whitespace-nowrap px-7 text-sm font-semibold uppercase tracking-[0.16em] text-dim">
          <Icon name="sparkle" size={13} className="text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-night-950/60 py-4" role="group" aria-label={d.marquee.join(' · ')}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night-900 to-transparent" />
    </div>
  );
}
