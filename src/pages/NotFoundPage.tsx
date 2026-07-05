import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import { Icon } from '../components/icons';

export default function NotFoundPage() {
  const { d, lang } = useI18n();

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[7rem] leading-none text-accent sm:text-[10rem]"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="display-md mt-2 text-ink"
      >
        {d.notFound.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="mt-3 max-w-sm text-dim">
        {d.notFound.body}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-8">
        <Link to={`/${lang}`} className="btn-accent btn-lg">
          <Icon name="arrowRight" size={16} className="rotate-180" />
          {d.notFound.cta}
        </Link>
      </motion.div>
    </div>
  );
}
