import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ServiceId } from '../lib/services';

const BookingWizard = lazy(() => import('./wizard/BookingWizard'));

interface BookingCtx {
  openWizard: (serviceId?: ServiceId) => void;
}

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preselect, setPreselect] = useState<ServiceId | undefined>();

  const openWizard = useCallback((serviceId?: ServiceId) => {
    setPreselect(serviceId);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openWizard }), [openWizard]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <BookingWizard preselect={preselect} onClose={() => setOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function useBooking(): BookingCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
