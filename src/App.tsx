import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { detectLang, I18nProvider, isLang, type Lang } from './lib/i18n';
import { BookingProvider } from './components/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const VisitPage = lazy(() => import('./pages/VisitPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

/** Last line of defense: never let a runtime error black-screen the site. */
class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-night-950 px-6 text-center">
          <p className="font-display text-3xl uppercase text-ink">Something went wrong</p>
          <p className="max-w-sm text-sm text-dim">
            An unexpected error occurred. Reloading the page fixes it — your booking data is safe.
          </p>
          <button type="button" className="btn-accent btn-md" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function RedirectToLang() {
  return <Navigate to={`/${detectLang()}`} replace />;
}

function LocaleShell() {
  const params = useParams<{ lang: string }>();
  const location = useLocation();
  const reduce = useReducedMotion();

  if (!isLang(params.lang)) return <RedirectToLang />;
  const lang = params.lang as Lang;

  return (
    <I18nProvider lang={lang}>
      <BookingProvider>
        <Navbar />
        <ScrollToTop />
        {/* Enter-only transition: the old page unmounts instantly, the new one
            fades in. No exit choreography — exit animations on route change
            collide with React Router when the locale segment itself changes. */}
        <motion.main
          key={location.pathname}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="visit" element={<VisitPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </motion.main>
        <Footer />
      </BookingProvider>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-night-950" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/:lang/*" element={<LocaleShell />} />
      </Routes>
    </AppErrorBoundary>
  );
}
