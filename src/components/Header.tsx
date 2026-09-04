import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Scale, Mail, ShieldAlert, Layers, ChevronDown, BookOpen } from 'lucide-react';
import { useUnit } from '../context/UnitContext';
import { CATEGORIES_CATALOG } from '../data/calculatorsData';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const { unitSystem, toggleUnitSystem } = useUnit();
  const location = useLocation();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <header className="w-full bg-slate-950/95 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                  ZenFit<span className="text-amber-400">.Tools</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  19 Elite Tools
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Physiological &amp; Biohacking Analytics
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Hubs Dropdown for Categories */}
        <div className="hidden lg:flex items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              onBlur={() => setTimeout(() => setIsCategoryMenuOpen(false), 200)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Category Hubs</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                {CATEGORIES_CATALOG.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.routePath}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="block px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-800 hover:text-amber-400 font-semibold transition-colors"
                  >
                    <div className="font-bold text-slate-100">{cat.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{cat.badge}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/methodology"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              location.pathname === '/methodology'
                ? 'bg-slate-800 text-amber-400'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Science Methodology
          </Link>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle Button */}
          <button
            id="global-unit-toggle-btn"
            onClick={toggleUnitSystem}
            title={`Switch to ${unitSystem === 'metric' ? 'Imperial (lb, in)' : 'Metric (kg, cm)'}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-amber-500/60 hover:text-white transition-all shadow-inner"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider font-mono text-[11px]">
              {unitSystem === 'metric' ? 'Metric' : 'Imperial'}
            </span>
          </button>

          {/* Contact Support */}
          {onOpenContact ? (
            <button
              id="nav-contact-btn"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Contact</span>
            </button>
          ) : (
            <Link
              id="nav-contact-btn"
              to="/contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          )}

          {/* Disclaimer / Legal Link */}
          <Link
            id="nav-legal-btn"
            to="/disclaimer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline text-[11px]">Clinical Notice</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
