import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronRight, Home, Layers, Sparkles, BookOpen, Flame, ArrowLeft } from 'lucide-react';
import { CALCULATORS_CATALOG, CATEGORIES_CATALOG } from '../data/calculatorsData';
import { CalculatorCard } from '../components/CalculatorCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { CategoryMeta } from '../types';

interface CategoryPageProps {
  category?: CategoryMeta;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category: propCategory }) => {
  const location = useLocation();
  const params = useParams();

  const category =
    propCategory ||
    CATEGORIES_CATALOG.find((cat) => cat.routePath === location.pathname) ||
    CATEGORIES_CATALOG.find(
      (cat) =>
        cat.slug === params.categorySlug ||
        cat.routePath.endsWith(`/${params.categorySlug}`) ||
        cat.id === params.categorySlug
    ) ||
    CATEGORIES_CATALOG[0];

  const categoryCalculators = CALCULATORS_CATALOG.filter(
    (c) => c.category === category.id
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} Calculators | ZenFit Tools`,
    description: category.shortDescription,
    url: `https://zenfittools.com${category.routePath}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryCalculators.map((c, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: c.title,
        url: `https://zenfittools.com${c.routePath}`,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://zenfittools.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: 'https://zenfittools.com/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `https://zenfittools.com${category.routePath}`,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{`${category.title} Calculators & Clinical Guides | ZenFit Tools`}</title>
        <meta name="description" content={category.shortDescription} />
        <link rel="canonical" href={`https://zenfittools.com${category.routePath}`} />
        <meta property="og:title" content={`${category.title} Calculators | ZenFit Tools`} />
        <meta property="og:description" content={category.shortDescription} />
        <meta property="og:url" content={`https://zenfittools.com${category.routePath}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Head>

      {/* Category Hero Banner */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-slate-950/90 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="inline-flex items-center gap-2 text-xs text-slate-400 mb-6 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
          >
            <Link to="/" className="hover:text-amber-400 flex items-center gap-1 font-semibold">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400">Categories</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-amber-400 font-bold">{category.title}</span>
          </nav>

          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider mb-4">
            {category.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {category.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {category.shortDescription}
          </p>
        </div>
      </section>

      {/* TOP LEADERBOARD ADVERTISEMENT (AdSense Slot 3) */}
      <AdSenseSlot position="top_leaderboard" />

      {/* Main Responsive Body with Left and Right Skyscraper Ad Rails */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center gap-6">
        {/* LEFT RAIL ADVERTISEMENT (AdSense Slot 1: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="left_rail" />

        {/* CENTER CONTENT AREA */}
        <main className="flex-1 w-full max-w-5xl min-w-0 py-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {categoryCalculators.length} Validated Calculators in this Suite
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select any calculator below to open its dedicated analytics console.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All 19 Tools</span>
            </Link>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {categoryCalculators.map((c) => (
              <CalculatorCard key={c.id} calc={c} />
            ))}
          </div>

          {/* Educational Insights Box */}
          <section className="p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Physiological Foundations: {category.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Clinical standards, peer-reviewed accuracy, and biometric parameters
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Calculators within the {category.title} division are built strictly according to peer-reviewed clinical cohorts. All mathematical engines run client-side to protect your personal biometric data with zero telemetry or remote storage.
            </p>

            <div className="pt-2">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                <span>Review peer-reviewed citations &amp; clinical references</span>
                <ChevronRight className="w-3.5 h-3.5" />
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
