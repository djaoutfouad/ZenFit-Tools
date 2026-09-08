import React from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, BookOpen, HeartPulse, Home, ChevronRight, Mail, Users, FileCheck2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ZenFit Tools & Editorial Board',
    description: 'Learn about the scientific methodology, physiological standards, and editorial integrity behind ZenFit Tools.',
    url: 'https://zenfittools.com/about',
    publisher: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      url: 'https://zenfittools.com',
      email: 'zenfittools@gmail.com',
    },
  };

  return (
    <>
      <Head>
        <title>About Us & Scientific Editorial Board | ZenFit Tools</title>
        <meta
          name="description"
          content="Learn about the scientific methodology, physiological standards, and evidence-based editorial integrity behind ZenFit Tools."
        />
        <link rel="canonical" href="https://zenfittools.com/about" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-white/60 px-4 py-2.5 rounded-2xl border border-slate-200">
          <Link className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold" to="/">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">About & Editorial Board</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
              Institutional Transparency & Standards
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About ZenFit Tools</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-3xl leading-relaxed">
              ZenFit Tools is a high-precision physiological analytics platform engineered to bridge peer-reviewed sports science, clinical nutrition research, and day-to-day fitness programming.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Our Scientific Mission & Integrity
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              In an online wellness space dominated by arbitrary fitness trends and opaque estimation tools, ZenFit Tools operates on strict algorithmic transparency. Every formula implemented in our suite of 19 specialized calculators is directly adopted from validated cohorts published in peer-reviewed scientific journals, including the American Journal of Clinical Nutrition, the British Journal of Sports Medicine, and the Journal of the American College of Cardiology.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Client-Side Biometric Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your physiological inputs execute strictly inside your local browser. No personal health records are sent to remote servers.
              </p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <FileCheck2 className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Peer-Reviewed Equations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculators explicitly display their underlying formulas along with academic citations and clinical boundary conditions.
              </p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <HeartPulse className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Educational Scope Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations are theoretical empirical models and are accompanied by safety disclosures advising medical consultation.
              </p>
            </div>
          </section>

          <section className="border-t border-slate-100 pt-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              Editorial Board & Scientific Review Policy
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our editorial contributors and content engineers review calculator formulas against updated guidelines established by the American College of Sports Medicine (ACSM), the International Society of Sports Nutrition (ISSN), and the National Strength and Conditioning Association (NSCA).
            </p>
          </section>

          <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Direct Scientific Review & Partnership Inquiries:</span>
            <a href="mailto:zenfittools@gmail.com" className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              zenfittools@gmail.com
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
