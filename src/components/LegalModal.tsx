import React from 'react';
import { X, ShieldCheck, FileText, Cookie, AlertTriangle, BookOpen } from 'lucide-react';
import { LegalDocType } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  activeDoc: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: LegalDocType) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeDoc,
  onClose,
  onSelectDoc,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Legal, Privacy & Compliance</h3>
              <p className="text-xs text-slate-500">Official ZenFit Tools Documentation · zenfittools@gmail.com</p>
            </div>
          </div>
          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 px-6 py-3 border-b border-slate-100 bg-white">
          <button
            id="tab-privacy-policy"
            onClick={() => onSelectDoc('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeDoc === 'privacy'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Policy
          </button>
          <button
            id="tab-terms-of-use"
            onClick={() => onSelectDoc('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeDoc === 'terms'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Terms of Use
          </button>
          <button
            id="tab-cookie-policy"
            onClick={() => onSelectDoc('cookies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeDoc === 'cookies'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Cookie className="w-4 h-4" />
            Cookie Policy
          </button>
          <button
            id="tab-disclaimer"
            onClick={() => onSelectDoc('disclaimer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeDoc === 'disclaimer'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Medical Disclaimer
          </button>
          <button
            id="tab-methodology"
            onClick={() => onSelectDoc('methodology')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeDoc === 'methodology'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Methodology
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 text-slate-700 text-sm leading-relaxed space-y-4">
          {activeDoc === 'privacy' && (
            <div id="content-privacy" className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Privacy Policy</h4>
              <p className="text-xs text-slate-400">Effective Date: January 1, 2026 · Last Updated: September 2026</p>
              <p>
                At <strong>ZenFit Tools</strong> (accessible via our digital properties, contact: <strong>zenfittools@gmail.com</strong>), the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of personal and non-personal data collected, recorded, and processed in full compliance with the European General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and global privacy standards.
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">1. 100% Client-Side Computation Privacy</h5>
              <p>
                All 19 calculators provided on ZenFit Tools (including body weight, body fat percentages, heart rates, running paces, and fasting windows) execute strictly inside your local web browser using client-side JavaScript. <strong>Your physiological inputs, personal biometric parameters, and fitness metrics are never transmitted to, stored on, or harvested by our servers.</strong>
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">2. Google AdSense & Third-Party Advertising</h5>
              <p>
                We may utilize Google AdSense and accredited advertising partners to serve advertisements when you visit our website. Google, as a third-party vendor, uses cookies to serve ads based on prior visits to this and other websites on the internet. You can opt out of personalized advertising by visiting Google Ad Settings (https://www.google.com/settings/ads).
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">3. Direct Inquiries & Contact Information</h5>
              <p>
                If you contact us directly via our email portal (zenfittools@gmail.com) or the embedded EmailJS contact form, we only retain your provided name, email address, and message content for the sole purpose of resolving your inquiry. We never sell, rent, or trade your contact details with commercial third parties.
              </p>
            </div>
          )}

          {activeDoc === 'terms' && (
            <div id="content-terms" className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Terms of Use</h4>
              <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
              <p>
                Welcome to ZenFit Tools. By accessing or utilizing any of our 19 health, fitness, nutrition, and biohacking calculators, you agree to be bound by these Terms of Use and all applicable laws and regulations.
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">1. Intellectual Property & Permitted Use</h5>
              <p>
                The formulas, layouts, editorial articles, interactive algorithms, and graphic presentations on ZenFit Tools are protected by international copyright, trademark, and intellectual property treaties. You are granted a limited, non-exclusive license to use these calculators for personal, educational, and non-commercial fitness optimization.
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">2. Limitation of Liability</h5>
              <p>
                In no event shall ZenFit Tools, its creators, or affiliates be held liable for any damages (including, without limitation, injuries, physical distress, metabolic disruptions, or lost training time) arising from the use or inability to use the mathematical estimates provided on this platform.
              </p>
            </div>
          )}

          {activeDoc === 'cookies' && (
            <div id="content-cookies" className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Cookie Policy</h4>
              <p className="text-xs text-slate-400">Compliance with ePrivacy Directive & GDPR</p>
              <p>
                Cookies are tiny data files stored in your web browser. ZenFit Tools uses minimal cookies necessary to preserve your user interface preferences (such as your chosen unit system: Metric vs. Imperial) in your browser’s localStorage.
              </p>
              <h5 className="font-semibold text-slate-900 pt-2">Advertising Cookies</h5>
              <p>
                Third-party ad vendors, including Google, utilize cookies to serve ads based on your prior visits. These cookies enable Google and its partners to serve ads based on your navigation habits across websites. Users may manage or revoke consent at any time through their individual browser privacy preferences.
              </p>
            </div>
          )}

          {activeDoc === 'disclaimer' && (
            <div id="content-disclaimer" className="space-y-4">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  CRITICAL MEDICAL DISCLOSURE: ZenFit Tools is an empirical mathematical and educational suite. It is NOT a medical device, clinical diagnostic instrument, or prescription health service.
                </p>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Health & Exercise Science Disclaimer</h4>
              <p>
                The outputs generated by all 19 calculators (including Total Daily Energy Expenditure, Target Heart Rate Zones, Intermittent Fasting Windows, Creatine Loading, and One-Rep Max predictions) are theoretical mathematical approximations based on peer-reviewed clinical cohorts and population averages.
              </p>
              <p>
                Always consult with a board-certified physician, cardiologist, licensed registered dietitian, or certified strength and conditioning specialist (CSCS) before initiating any severe caloric restriction, high-volume resistance training, rapid fasting regimen, or ergogenic supplementation.
              </p>
            </div>
          )}

          {activeDoc === 'methodology' && (
            <div id="content-methodology" className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Scientific Methodology & Formulas</h4>
              <p>
                ZenFit Tools is built upon validated human physiological formulas published in leading peer-reviewed sports science and clinical nutrition journals. Every tool is grounded in reproducible empirical models:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Metabolism:</strong> Mifflin-St Jeor (1990) and Katch-McArdle equations validated by the American Dietetic Association.</li>
                <li><strong>Circumference Anthropometry:</strong> US Department of Defense Hodgdon & Beckett (1984) logarithmic regression model.</li>
                <li><strong>Muscular Limits & FFMI:</strong> Kouri et al. (1995) 157-athlete natural baseline study and Dr. Casey Butt’s bone-structure frame equations.</li>
                <li><strong>Cardiovascular Zones:</strong> Tanaka et al. (2001) meta-analysis of 18,712 subjects paired with Karvonen Heart Rate Reserve equations.</li>
                <li><strong>Endurance Pacing:</strong> Pete Riegel (1981) fatigue exponent model (T2 = T1 × (D2/D1)^1.06).</li>
                <li><strong>Energy Burn:</strong> Ainsworth et al. Compendium of Physical Activities Metabolic Equivalent of Task (MET) library.</li>
              </ul>
              <p className="text-xs text-slate-500 pt-2">
                Have questions about our mathematical proofs or physiological data models? Contact our science research team at <strong>zenfittools@gmail.com</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <span className="text-xs text-slate-500">Official contact: zenfittools@gmail.com</span>
          <button
            id="close-legal-bottom-btn"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
