import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Routes location={location}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="visit" element={<VisitPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </BookingProvider>
    </I18nProvider>
  );
}

export default function App() {
  return (
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
  );
}
