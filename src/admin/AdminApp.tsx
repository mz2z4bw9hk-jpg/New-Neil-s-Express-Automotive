import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/icons';
import { AdminDashboard } from './AdminDashboard';

/**
 * Staff console (English-only by design — internal tool).
 * Demo auth: credentials are checked client-side and a flag is kept in
 * localStorage. Swap for a real auth provider when wiring a backend.
 */
const DEMO_USER = 'admin';
const DEMO_PASS = 'garvey9844';
const SESSION_KEY = 'car.admin.session';

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(SESSION_KEY) === '1');
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = 'Staff Console — Castro Auto Repair Service';
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('user') === DEMO_USER && fd.get('pass') === DEMO_PASS) {
      localStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-950 px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <Logo />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-dim">Staff Console</p>
          </div>

          <form onSubmit={onSubmit} className="card space-y-4 p-7">
            <div>
              <label htmlFor="ad-user" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
                Username
              </label>
              <input
                id="ad-user"
                name="user"
                autoComplete="username"
                className="w-full rounded-xl border border-line bg-night-900 px-4 py-3 text-sm text-ink focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label htmlFor="ad-pass" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dim">
                Password
              </label>
              <input
                id="ad-pass"
                name="pass"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-line bg-night-900 px-4 py-3 text-sm text-ink focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            {error && (
              <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-medium text-red-300">
                Invalid credentials — try the demo login below.
              </p>
            )}
            <button type="submit" className="btn-accent btn-md w-full">
              Sign in
              <Icon name="arrowRight" size={15} />
            </button>
            <p className="rounded-lg bg-night-900/80 px-3 py-2 text-center text-xs text-faint">
              Demo login: <span className="font-mono text-dim">admin</span> / <span className="font-mono text-dim">garvey9844</span>
            </p>
          </form>

          <p className="mt-6 text-center">
            <Link to="/" className="text-xs text-faint transition hover:text-dim">
              ← Back to website
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminDashboard
      onSignOut={() => {
        localStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
}
