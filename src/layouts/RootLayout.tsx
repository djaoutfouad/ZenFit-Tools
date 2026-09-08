import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { UnitProvider } from '../context/UnitContext';

export const RootLayout: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  return (
    <UnitProvider>
      <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-950">
        <Header onOpenContact={() => setIsContactOpen(true)} />

        <div className="flex-1">
          <Outlet />
        </div>

        <Footer onOpenContact={() => setIsContactOpen(true)} />

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          defaultSubject="General Inquiry regarding ZenFit Tools"
        />
      </div>
    </UnitProvider>
  );
};
