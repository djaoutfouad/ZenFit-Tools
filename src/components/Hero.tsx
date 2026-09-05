import React from 'react';
import { Search, Flame, Zap, ShieldCheck, Activity, Award } from 'lucide-react';
import { CalculatorCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CalculatorCategory;
  onSelectCategory: (cat: CalculatorCategory) => void;
  onSelectCalculator: (id: string) => void;
  totalCalculatorsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSelectCalculator,
  totalCalculatorsCount,
}) => {
  const categories: Array<{ id: CalculatorCategory; label: string; count: number }> = [
    { id: 'all', label: 'All 19 Calculators', count: 19 },
    { id: 'metabolism', label: 'Metabolism & Diet', count: 5 },
    { id: 'body_composition', label: 'Body Composition', count: 5 },
    { id: 'performance', label: 'Cardio & Strength', count: 5 },
    { id: 'biohacking', label: 'Biohacking & Recovery', count: 4 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* Gym-Tech Architectural Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-65 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop")',
        }}
        aria-hidden="true"
      />

      {/* Architectural vignette gradient with subtle backdrop blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/90 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Gym-Tech Physiological Architecture · 2026 Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
          Elite Health, Nutrition &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
            Biohacking Analytics
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Nineteen validated sports medicine, metabolic, and anthropometric calculators.
          Instant client-side precision, peer-reviewed formulas, and zero server latency.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              id="hero-calculator-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by metric (e.g., TDEE, 1RM, Body Fat, Creatine, WHtR, Sleep)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-xl backdrop-blur-md transition-all"
            />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-amber-600/30 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Client-Side Math</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>ACSM &amp; ISSN Aligned</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Zero Data Harvesting</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>AdSense 2026 Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};
