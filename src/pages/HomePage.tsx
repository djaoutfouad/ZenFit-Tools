import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Grid, Layers, Sparkles, BookOpen, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CalculatorCard } from '../components/CalculatorCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { CALCULATORS_CATALOG, CATEGORIES_CATALOG } from '../data/calculatorsData';
import { CalculatorCategory } from '../types';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('all');

  const filteredCalculators = CALCULATORS_CATALOG.filter((calc) => {
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZenFit Tools',
    url: 'https://zenfittools.com/',
    description:
      'Precision sports science, metabolic rate, and human performance analytics suite with 19 dedicated client-side calculators.',
    publisher: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      email: 'zenfittools@gmail.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zenfittools.com/icon.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://zenfittools.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Head>
        <title>ZenFit Tools | Elite Health, Nutrition &amp; Biohacking Calculators</title>
        <meta
          name="description"
          content="Explore 19 validated sports medicine, metabolic, and anthropometric calculators. Instant client-side precision, peer-reviewed formulas, and zero server latency."
        />
        <link rel="canonical" href="https://zenfittools.com/" />
        <meta property="og:title" content="ZenFit Tools | Elite Health, Nutrition & Biohacking Calculators" />
        <meta
          property="og:description"
          content="Explore 19 validated sports medicine, metabolic, and anthropometric calculators with instant client-side execution."
        />
        <meta property="og:url" content="https://zenfittools.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>

      {/* Hero Section (Vivid Gym-Tech Architectural Style) */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onSelectCalculator={() => {}}
        totalCalculatorsCount={CALCULATORS_CATALOG.length}
      />

      {/* TOP LEADERBOARD ADVERTISEMENT (AdSense Slot 3) */}
      <AdSenseSlot position="top_leaderboard" />

      {/* Main Responsive Body with Left and Right Skyscraper Ad Rails */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center gap-6">
        {/* LEFT RAIL ADVERTISEMENT (AdSense Slot 1: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="left_rail" />

        {/* CENTER CONTENT AREA */}
        <main className="flex-1 w-full max-w-5xl min-w-0">
          {/* Quick-Access Grid of All 19 Calculators */}
          <section id="all-calculators-grid" className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Grid className="w-5 h-5 text-amber-500" />
                  Explore The 19 Elite Physiological Tools
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Select any calculator below to open its dedicated analytics workstation, peer-reviewed formulas, and clinical guidelines.
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto shadow-xs">
                Showing {filteredCalculators.length} of {CALCULATORS_CATALOG.length} Tools
              </div>
            </div>

            {filteredCalculators.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-sm font-semibold text-slate-600">
                  No calculators found matching "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCalculators.map((c) => (
                  <CalculatorCard key={c.id} calc={c} />
                ))}
              </div>
            )}
          </section>

          {/* Category Hubs Navigation Cards */}
          <section className="py-10 border-t border-slate-200">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                Specialized Category Hubs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Browse our curated physiological clusters designed around specific training, metabolic, and biometric goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CATEGORIES_CATALOG.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.routePath}
                  className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 uppercase tracking-wider mb-3">
                      {cat.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {cat.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                    <span>Explore Hub Calculators</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Evidence-Based Scientific Standards Overview */}
          <section className="my-10 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Validated Sports Science &amp; Peer-Reviewed Standards
                </h3>
                <p className="text-xs text-slate-500">
                  Rigorous clinical formulas derived from ACSM, ISSN, DoD, and PubMed peer reviews
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every tool within ZenFit Tools is engineered from verified empirical literature. From Mifflin-St Jeor metabolic calorimetry and Hodgdon-Beckett logarithmic anthropometry to Casey Butt's muscular potential formulas and Tanaka heart rate kinetics, we eliminate speculative gym-lore in favor of peer-reviewed mathematical certainty.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
              >
                <span>Read Full Methodology &amp; Citations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                to="/disclaimer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <span>Medical &amp; Clinical Disclosures</span>
              </Link>
            </div>
          </section>
        </main>

        {/* RIGHT RAIL ADVERTISEMENT (AdSense Slot 2: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="right_rail" />
      </div>
    </>
  );
};
