import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Mail, ShieldCheck, Heart } from 'lucide-react';
import { CALCULATORS_CATALOG, CATEGORIES_CATALOG } from '../data/calculatorsData';
import { AdSenseSlot } from './AdSenseSlot';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const currentYear = 2026;
  const location = useLocation();

  // Exclude ads from sensitive legal pages per AdSense 2026 guidelines
  const isSensitiveLegalPage = ['/privacy', '/terms', '/cookies', '/disclaimer'].includes(
    location.pathname
  );

  const metabolismCalcs = CALCULATORS_CATALOG.filter((c) => c.category === 'metabolism');
  const bodyCompCalcs = CALCULATORS_CATALOG.filter((c) => c.category === 'body_composition');
  const performanceCalcs = CALCULATORS_CATALOG.filter((c) => c.category === 'performance');
  const biohackingCalcs = CALCULATORS_CATALOG.filter((c) => c.category === 'biohacking');

  return (
    <footer className="w-full bg-slate-950 text-white border-t border-slate-800/80">
      {/* PRE-FOOTER BANNER (AdSense Slot 5) - Strictly excluded from sensitive legal pages */}
      {!isSensitiveLegalPage && (
        <div className="pt-8 pb-4">
          <AdSenseSlot position="pre_footer" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & About */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Dumbbell className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-lg font-extrabold tracking-tight font-sans">
                ZenFit<span className="text-amber-400">.Tools</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision health, nutrition, and biohacking analytics suite engineered for athletes, coaches, and sports science enthusiasts. 100% browser-based calculations with zero telemetry or data harvesting.
            </p>
            <div className="pt-2">
              <a
                href="mailto:zenfittools@gmail.com"
                className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>zenfittools@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Category 1: Metabolism & Nutrition */}
          <div>
            <Link
              to="/categories/metabolism-diet"
              className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 hover:text-amber-400 transition-colors"
            >
              Metabolism &amp; Diet →
            </Link>
            <ul className="space-y-2 text-xs text-slate-400">
              {metabolismCalcs.map((calc) => (
                <li key={calc.id}>
                  <Link
                    to={calc.routePath}
                    className="hover:text-amber-400 transition-colors block text-left"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category 2: Body Composition */}
          <div>
            <Link
              to="/categories/body-composition"
              className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 hover:text-amber-400 transition-colors"
            >
              Body Composition →
            </Link>
            <ul className="space-y-2 text-xs text-slate-400">
              {bodyCompCalcs.map((calc) => (
                <li key={calc.id}>
                  <Link
                    to={calc.routePath}
                    className="hover:text-amber-400 transition-colors block text-left"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category 3: Cardio & Strength */}
          <div>
            <Link
              to="/categories/cardio-strength"
              className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 hover:text-amber-400 transition-colors"
            >
              Cardio &amp; Strength →
            </Link>
            <ul className="space-y-2 text-xs text-slate-400">
              {performanceCalcs.map((calc) => (
                <li key={calc.id}>
                  <Link
                    to={calc.routePath}
                    className="hover:text-amber-400 transition-colors block text-left"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category 4: Biohacking & Recovery */}
          <div>
            <Link
              to="/categories/biohacking-recovery"
              className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 hover:text-amber-400 transition-colors"
            >
              Biohacking &amp; Recovery →
            </Link>
            <ul className="space-y-2 text-xs text-slate-400">
              {biohackingCalcs.map((calc) => (
                <li key={calc.id}>
                  <Link
                    to={calc.routePath}
                    className="hover:text-amber-400 transition-colors block text-left"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Compliance & Trust Disclaimers */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4 text-xs text-slate-400">
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>100% Client-Side Privacy Architecture:</strong> ZenFit Tools performs all mathematical and biological calculations entirely within your device’s web browser. No personal health records, weight metrics, body fat estimations, or fitness inputs are ever transmitted to or stored on remote web servers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span>© {currentYear} ZenFit Tools. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-slate-300">Official Contact: zenfittools@gmail.com</span>
            </div>

            {/* Static Legal Page Links */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-amber-400 transition-colors">
                Terms of Use
              </Link>
              <span>•</span>
              <Link to="/cookies" className="hover:text-amber-400 transition-colors">
                Cookie Policy
              </Link>
              <span>•</span>
              <Link to="/disclaimer" className="hover:text-amber-400 transition-colors">
                Medical Disclaimer
              </Link>
              <span>•</span>
              <Link to="/methodology" className="hover:text-amber-400 transition-colors">
                Scientific Methodology
              </Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
