import React, { useState, useEffect } from 'react';
import { CALCULATORS_DATA } from './data/calculatorsData';
import { CalculatorMeta, UnitSystem, CalculatorCategory, LegalDocType } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CalculatorCard } from './components/CalculatorCard';
import { CalculatorWorkspace } from './components/CalculatorWorkspace';
import { AdSenseSlot } from './components/AdSenseSlot';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { LegalModal } from './components/LegalModal';
import { Grid, Layers, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Unit system: persisted in localStorage
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem('zenfit_unit_system');
    return saved === 'imperial' ? 'imperial' : 'metric';
  });

  // Selected calculator ID: sync with URL hash or default to 'tdee'
  const [selectedCalcId, setSelectedCalcId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && CALCULATORS_DATA.some((c) => c.id === hash)) {
      return hash;
    }
    return 'tdee';
  });

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('all');

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>('privacy');

  // Listen to hash changes (browser back/forward buttons or direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && CALCULATORS_DATA.some((c) => c.id === hash)) {
        setSelectedCalcId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleUnit = () => {
    const nextUnit: UnitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(nextUnit);
    localStorage.setItem('zenfit_unit_system', nextUnit);
  };

  const handleSelectCalculator = (id: string) => {
    setSelectedCalcId(id);
    window.location.hash = id;
    // Smooth scroll to the workspace
    const el = document.getElementById('calculator-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLegal = (doc: LegalDocType = 'privacy') => {
    setLegalDocType(doc);
    setIsLegalOpen(true);
  };

  // Find active calculator
  const activeCalc =
    CALCULATORS_DATA.find((c) => c.id === selectedCalcId) || CALCULATORS_DATA[0];

  // Filter calculators for the explore grid
  const filteredCalculators = CALCULATORS_DATA.filter((calc) => {
    const matchesCategory =
      selectedCategory === 'all' || calc.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      calc.title.toLowerCase().includes(query) ||
      calc.shortDescription.toLowerCase().includes(query) ||
      calc.badge.toLowerCase().includes(query) ||
      calc.formulaSummary.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Global Header */}
      <Header
        unitSystem={unitSystem}
        onToggleUnit={handleToggleUnit}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenLegal={() => handleOpenLegal('methodology')}
        totalCalculatorsCount={CALCULATORS_DATA.length}
      />

      {/* Hero Section (Gym-Tech Architectural Style) */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onSelectCalculator={handleSelectCalculator}
        totalCalculatorsCount={CALCULATORS_DATA.length}
      />

      {/* TOP LEADERBOARD ADVERTISEMENT (AdSense Slot 3) */}
      <AdSenseSlot position="top_leaderboard" />

      {/* Main Responsive Body with Left and Right Skyscraper Ad Rails */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center gap-6">
        {/* LEFT RAIL ADVERTISEMENT (AdSense Slot 1: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="left_rail" />

        {/* CENTER CONTENT AREA */}
        <main className="flex-1 w-full max-w-5xl min-w-0">
          {/* Active Calculator Interactive Workspace */}
          <div className="mb-14">
            <CalculatorWorkspace
              key={`${activeCalc.id}-${unitSystem}`}
              calc={activeCalc}
              unitSystem={unitSystem}
              onToggleUnit={handleToggleUnit}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>

          {/* Quick-Access Grid of All 19 Calculators */}
          <section id="all-calculators-grid" className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-amber-500" />
                  Explore The 19 Elite Physiological Tools
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Click any card to load the client-side calculator and complete scientific guide.
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                Showing {filteredCalculators.length} of {CALCULATORS_DATA.length} Tools
              </div>
            </div>

            {filteredCalculators.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-600">
                  No calculators found matching "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCalculators.map((c) => (
                  <CalculatorCard
                    key={c.id}
                    calc={c}
                    isSelected={c.id === activeCalc.id}
                    onSelect={handleSelectCalculator}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* RIGHT RAIL ADVERTISEMENT (AdSense Slot 2: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="right_rail" />
      </div>

      {/* Global Footer (Contains AdSense Slot 5: Pre-Footer Banner) */}
      <Footer
        calculators={CALCULATORS_DATA}
        onSelectCalculator={handleSelectCalculator}
        onOpenLegal={handleOpenLegal}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact Support Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={`Inquiry regarding ${activeCalc.title}`}
      />

      {/* Legal & Methodology Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        activeDoc={legalDocType}
        onClose={() => setIsLegalOpen(false)}
        onSelectDoc={setLegalDocType}
      />
    </div>
  );
}
