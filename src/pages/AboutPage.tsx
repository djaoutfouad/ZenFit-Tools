import React from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, BookOpen, HeartPulse, Home, ChevronRight, Mail, Users, FileCheck2 } from 'lucide-react';
import { getCanonicalUrl, SITE_NAME, CONTACT_EMAIL } from '../config/site';

export const AboutPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    description: 'Learn about the scientific methodology, physiological formulas, and educational standards behind ZenFit Tools.',
    url: getCanonicalUrl('/about'),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: getCanonicalUrl('/'),
      email: CONTACT_EMAIL,
    },
  };

  return (
    <>
      <Head>
        <title>About Us &amp; Educational Mission | ZenFit Tools</title>
        <meta
          name="description"
          content="Learn about the scientific methodology, published physiological formulas, and educational standards behind ZenFit Tools."
        />
        <link rel="canonical" href={getCanonicalUrl('/about')} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-white/60 px-4 py-2.5 rounded-2xl border border-slate-200">
          <Link className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold" to="/">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">About &amp; Educational Standards</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
              Transparency &amp; Educational Standards
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About ZenFit Tools</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-3xl leading-relaxed">
              ZenFit Tools is an educational physiological analytics platform engineered to help athletes and fitness enthusiasts understand published sports science formulas, metabolic models, and body composition estimates.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Our Educational Mission
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              In an online fitness space full of black-box algorithms and unsubstantiated claims, ZenFit Tools emphasizes transparent mathematics. Every equation in our suite of 19 specialized calculators is directly derived from published sports science and clinical nutrition literature, including research published in the American Journal of Clinical Nutrition, British Journal of Sports Medicine, and Medicine &amp; Science in Sports &amp; Exercise.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Client-Side Biometric Computation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations run entirely in your local web browser. No personal biometric or physiological inputs are transmitted or stored on remote calculation servers.
              </p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <FileCheck2 className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Published Equations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculators explicitly display their underlying formulas, methodological context, scientific citations, and physiological boundary conditions.
              </p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <HeartPulse className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Educational Scope &amp; Safety Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations represent theoretical population models and statistical estimates. <span className="font-bold text-slate-900">Not medically reviewed.</span> Not intended as medical or diagnostic advice.
              </p>
            </div>
          </section>

          <section className="border-t border-slate-100 pt-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              Methodology &amp; Quality Guidelines
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our tools benchmark formulas against guidelines and normative data established by recognized sports science organizations, including the American College of Sports Medicine (ACSM) and the International Society of Sports Nutrition (ISSN).
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <strong>Medical Disclaimer:</strong> ZenFit Tools does not provide medical, diagnostic, or therapeutic services. Content and computation results are for educational purposes only. Always consult a qualified physician or healthcare provider regarding any health condition, diet, fasting protocol, or exercise regimen.
            </div>
          </section>

          <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Direct Inquiries &amp; Feedback:</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
