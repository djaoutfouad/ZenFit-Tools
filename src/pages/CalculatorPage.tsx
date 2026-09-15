import React, { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import {
  ChevronRight,
  Home,
  Layers,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { CALCULATORS_CATALOG, CATEGORIES_CATALOG } from '../data/calculatorsData';
import { CalculatorWorkspace } from '../components/CalculatorWorkspace';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { CalculatorCard } from '../components/CalculatorCard';
import { ContactModal } from '../components/ContactModal';
import { useUnit } from '../context/UnitContext';
import { CalculatorMeta } from '../types';

interface CalculatorPageProps {
  calc?: CalculatorMeta;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calc: propCalc }) => {
  const location = useLocation();
  const params = useParams();
  const { unitSystem, toggleUnitSystem } = useUnit();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Determine the active calculator
  const calc =
    propCalc ||
    CALCULATORS_CATALOG.find((c) => c.routePath === location.pathname) ||
    CALCULATORS_CATALOG.find(
      (c) =>
        c.slug === params.slug ||
        c.routePath.endsWith(`/${params.slug}`) ||
        c.id === params.slug
    ) ||
    CALCULATORS_CATALOG[0];

  const categoryMeta = CATEGORIES_CATALOG.find((cat) => cat.id === calc.category);

  // Related calculators in the same category
  const relatedCalcs = CALCULATORS_CATALOG.filter(
    (c) => c.category === calc.category && c.id !== calc.id
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Structured Data (SoftwareApplication + FAQPage)
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.title,
    url: `https://zenfittools.com${calc.routePath}`,
    description: calc.shortDescription,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    author: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      url: 'https://zenfittools.com/about',
      email: 'zenfittools@gmail.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      email: 'zenfittools@gmail.com',
      url: 'https://zenfittools.com/',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
        name: categoryMeta?.title || 'Calculators',
        item: `https://zenfittools.com${categoryMeta?.routePath || '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calc.title,
        item: `https://zenfittools.com${calc.routePath}`,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{`${calc.title} | ZenFit Tools`}</title>
        <meta name="description" content={calc.shortDescription} />
        <link rel="canonical" href={`https://zenfittools.com${calc.routePath}`} />
        <meta property="og:title" content={`${calc.title} | ZenFit Tools`} />
        <meta property="og:description" content={calc.shortDescription} />
        <meta property="og:url" content={`https://zenfittools.com${calc.routePath}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Head>

      {/* TOP LEADERBOARD ADVERTISEMENT (AdSense Slot 3) */}
      <AdSenseSlot position="top_leaderboard" />

      {/* Main Responsive Body with Left and Right Skyscraper Ad Rails */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center gap-6">
        {/* LEFT RAIL ADVERTISEMENT (AdSense Slot 1: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="left_rail" />

        {/* CENTER CONTENT AREA */}
        <main className="flex-1 w-full max-w-5xl min-w-0">
          {/* Dynamic Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center flex-wrap gap-2 text-xs text-slate-500 my-4 bg-white/60 px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs"
          >
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            {categoryMeta && (
              <>
                <Link
                  to={categoryMeta.routePath}
                  className="hover:text-amber-600 font-semibold transition-colors"
                >
                  {categoryMeta.title}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </>
            )}

            <span className="font-bold text-slate-900 truncate max-w-[280px] sm:max-w-md">
              {calc.title}
            </span>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                title="Copy link to calculator"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3" />
                    <span>Share Tool</span>
                  </>
                )}
              </button>
            </div>
          </nav>

          {/* Dedicated Calculator Interactive Workspace */}
          <div className="mb-12">
            <CalculatorWorkspace
              key={`${calc.id}-${unitSystem}`}
              calc={calc}
              unitSystem={unitSystem}
              onToggleUnit={toggleUnitSystem}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>

          {/* Related Calculators in this Category */}
          {relatedCalcs.length > 0 && (
            <section className="mb-14 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    More in {categoryMeta?.title || 'This Category'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complementary physiological calculations to refine your nutrition and programming.
                  </p>
                </div>

                {categoryMeta && (
                  <Link
                    to={categoryMeta.routePath}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 shrink-0"
                  >
                    View All {categoryMeta.title} →
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedCalcs.map((related) => (
                  <CalculatorCard key={related.id} calc={related} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT RAIL ADVERTISEMENT (AdSense Slot 2: 160x600 Sticky on xl screens) */}
        <AdSenseSlot position="right_rail" />
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={`Technical Inquiry regarding ${calc.title}`}
      />
    </>
  );
};
