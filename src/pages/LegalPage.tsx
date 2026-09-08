import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import {
  ShieldCheck,
  FileText,
  Cookie,
  AlertTriangle,
  BookOpen,
  Home,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { LEGAL_DOCS, LegalDoc } from '../data/legalDocsData';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { LegalDocType } from '../types';

interface LegalPageProps {
  docType?: LegalDocType;
}

export const LegalPage: React.FC<LegalPageProps> = ({ docType: propDocType }) => {
  const location = useLocation();

  // Determine doc type from prop or path
  let docType: LegalDocType = propDocType || 'privacy';
  if (!propDocType) {
    const cleanPath = location.pathname.replace(/^\//, '');
    if (cleanPath in LEGAL_DOCS) {
      docType = cleanPath as LegalDocType;
    }
  }

  const doc: LegalDoc = LEGAL_DOCS[docType] || LEGAL_DOCS.privacy;

  // Sensitive legal pages strictly exclude all ads per AdSense 2026 guidelines
  const isSensitive = ['privacy', 'terms', 'cookies', 'disclaimer'].includes(doc.type);

  const tabs: Array<{ type: LegalDocType; label: string; icon: React.ReactNode; path: string }> = [
    { type: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" />, path: '/privacy' },
    { type: 'terms', label: 'Terms of Use', icon: <FileText className="w-4 h-4" />, path: '/terms' },
    { type: 'cookies', label: 'Cookie Policy', icon: <Cookie className="w-4 h-4" />, path: '/cookies' },
    { type: 'disclaimer', label: 'Medical Disclaimer', icon: <AlertTriangle className="w-4 h-4" />, path: '/disclaimer' },
    { type: 'methodology', label: 'Scientific Methodology', icon: <BookOpen className="w-4 h-4" />, path: '/methodology' },
  ];

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${doc.title} | ZenFit Tools`,
    description: doc.metaDescription,
    url: `https://zenfittools.com${doc.routePath}`,
    publisher: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      email: 'zenfittools@gmail.com',
    },
  };

  return (
    <>
      <Head>
        <title>{`${doc.title} | ZenFit Tools`}</title>
        <meta name="description" content={doc.metaDescription} />
        <link rel="canonical" href={`https://zenfittools.com${doc.routePath}`} />
        <meta property="og:title" content={`${doc.title} | ZenFit Tools`} />
        <meta property="og:description" content={doc.metaDescription} />
        <meta property="og:url" content={`https://zenfittools.com${doc.routePath}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Head>

      {/* Top Leaderboard Ad ONLY if not sensitive legal page */}
      {!isSensitive && <AdSenseSlot position="top_leaderboard" />}

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-white/60 px-4 py-2.5 rounded-2xl border border-slate-200"
        >
          <Link to="/" className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Legal &amp; Compliance</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">{doc.title}</span>
        </nav>

        {/* Legal Tabs Navigation Bar */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60">
          {tabs.map((tab) => (
            <Link
              key={tab.type}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                tab.type === doc.type
                  ? 'bg-white text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* Document Content Card */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <header className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {doc.title}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{doc.effectiveDate}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Official ZenFit Tools Documentation · Official contact: <strong>zenfittools@gmail.com</strong>
            </p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
            {doc.sections.map((section, sIdx) => (
              <section
                key={sIdx}
                className={
                  section.warning
                    ? 'p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-950 space-y-2'
                    : 'space-y-3'
                }
              >
                <h2
                  className={`text-lg font-bold ${
                    section.warning ? 'text-amber-900 flex items-center gap-2' : 'text-slate-900'
                  }`}
                >
                  {section.warning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Questions or legal compliance requests?</span>
            <a
              href="mailto:zenfittools@gmail.com"
              className="inline-flex items-center gap-1.5 font-semibold text-amber-600 hover:text-amber-700"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>zenfittools@gmail.com</span>
            </a>
          </footer>
        </article>
      </div>
    </>
  );
};
