import { LegalDocType } from '../types';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  warning?: boolean;
}

export interface LegalDoc {
  type: LegalDocType;
  slug: string;
  routePath: string;
  title: string;
  metaDescription: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export const LEGAL_DOCS: Record<LegalDocType, LegalDoc> = {
  privacy: {
    type: 'privacy',
    slug: 'privacy',
    routePath: '/privacy',
    title: 'Privacy Policy',
    metaDescription: 'ZenFit Tools GDPR & CCPA privacy policy. 100% client-side computations ensure your personal biometric data never leaves your browser.',
    effectiveDate: 'Effective Date: January 1, 2026 · Last Updated: September 2026',
    sections: [
      {
        heading: '1. Commitment to Biometric Data Privacy',
        paragraphs: [
          'At ZenFit Tools (accessible via our official domains, contact: zenfittools@gmail.com), visitor privacy is our highest priority. This Privacy Policy documents how personal data is handled in full compliance with the European Union General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and international privacy frameworks.',
        ],
      },
      {
        heading: '2. 100% Client-Side Computational Sandbox',
        paragraphs: [
          'All 19 calculators provided on ZenFit Tools (including body weight, circumferences, body fat percentages, maximal heart rates, one-rep maxes, running paces, and fasting timers) execute entirely within your local browser runtime via JavaScript.',
          'Your physiological inputs, personal biometric metrics, and daily logs are NEVER transmitted to, stored on, processed by, or harvested on remote web servers or external third-party databases. You retain absolute sovereign ownership of your health inputs.',
        ],
      },
      {
        heading: '3. Google AdSense & Third-Party Advertising Compliance',
        paragraphs: [
          'We may partner with Google AdSense and certified advertising exchanges to display discrete, non-intrusive advertisements. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve relevant ads based on visits across the internet.',
          'Users may opt out of personalized interest-based advertising at any time by visiting Google Ad Settings (https://www.google.com/settings/ads) or aboutads.info.',
        ],
      },
      {
        heading: '4. Direct Communication & Inquiries',
        paragraphs: [
          'When contacting us directly via zenfittools@gmail.com or our contact portal, we only process the sender name, email address, and message content for the explicit purpose of resolving your inquiry or feedback. We never sell, lease, or distribute your email address to commercial marketing firms.',
        ],
      },
    ],
  },
  terms: {
    type: 'terms',
    slug: 'terms',
    routePath: '/terms',
    title: 'Terms of Use',
    metaDescription: 'Official terms of use for ZenFit Tools. Intellectual property, acceptable use, and limitation of liability.',
    effectiveDate: 'Effective Date: January 1, 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        paragraphs: [
          'By accessing or utilizing ZenFit Tools (including our 19 physiological analytics calculators, educational articles, and scientific reference guides), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable federal and international regulations.',
        ],
      },
      {
        heading: '2. Intellectual Property & Permitted Use',
        paragraphs: [
          'All algorithmic implementations, user interface designs, mathematical adaptations, and scientific texts are the proprietary intellectual property of ZenFit Tools. Users are granted a revocable, non-transferable license to utilize these tools for personal, non-commercial fitness tracking and academic study.',
        ],
      },
      {
        heading: '3. Disclaimer of Warranties & Limitation of Liability',
        paragraphs: [
          'The tools and data on this platform are provided on an "as is" and "as available" basis without warranties of any kind. ZenFit Tools and its operators disclaim all liability for physical injuries, metabolic disruptions, or training setbacks resulting from reliance on mathematical estimations.',
        ],
      },
    ],
  },
  cookies: {
    type: 'cookies',
    slug: 'cookies',
    routePath: '/cookies',
    title: 'Cookie Policy',
    metaDescription: 'ZenFit Tools Cookie Policy under GDPR and the ePrivacy Directive. Understanding functional vs advertising cookies.',
    effectiveDate: 'Effective Date: January 1, 2026',
    sections: [
      {
        heading: '1. What Are Cookies?',
        paragraphs: [
          'Cookies are small text strings saved on your local device by your browser. ZenFit Tools uses minimal functional cookies and browser localStorage strictly to preserve your user interface preferences (such as your chosen Metric vs. Imperial unit preference).',
        ],
      },
      {
        heading: '2. Advertising & Analytics Cookies',
        paragraphs: [
          'Third-party advertising partners such as Google AdSense employ cookies to serve discrete advertisements based on your prior web activity. These cookies help measure ad performance and prevent fraudulent impressions without tracking personal identifying health data.',
        ],
      },
      {
        heading: '3. Managing Cookie Preferences',
        paragraphs: [
          'You may configure your browser settings to decline or purge cookies at any time. The core computational functions of all 19 ZenFit calculators remain fully operational even if third-party cookies are completely blocked.',
        ],
      },
    ],
  },
  disclaimer: {
    type: 'disclaimer',
    slug: 'disclaimer',
    routePath: '/disclaimer',
    title: 'Medical & Exercise Science Disclaimer',
    metaDescription: 'Important health and medical disclaimer. ZenFit Tools provides mathematical estimations for educational purposes and is not a medical device.',
    effectiveDate: 'Effective Date: January 1, 2026 · Mandatory Notice',
    sections: [
      {
        heading: 'CRITICAL MEDICAL DISCLOSURE',
        paragraphs: [
          'ZenFit Tools is an empirical mathematical and educational suite designed for healthy adults. It is NOT a medical device, clinical diagnostic instrument, or prescription health service.',
        ],
        warning: true,
      },
      {
        heading: '1. Theoretical Population Estimations',
        paragraphs: [
          'The physiological calculations generated across all 19 tools (including Total Daily Energy Expenditure, Target Heart Rate Zones, Creatine Loading, Fasting Autophagy checkpoints, and One-Rep Max predictions) are theoretical mathematical approximations derived from peer-reviewed clinical cohorts and population averages.',
          'Individual metabolic rates, cardiovascular responses, and muscular capacities naturally fluctuate due to genetics, prescription medications, thyroid function, age, and chronic conditions.',
        ],
      },
      {
        heading: '2. Physician Consultation Requirement',
        paragraphs: [
          'Always consult with a board-certified physician, cardiologist, licensed sports dietitian, or certified health practitioner before embarking on severe caloric deficits, heavy resistance training programs, intense cardiovascular exertion, prolonged fasting, or nutritional supplementation.',
        ],
      },
    ],
  },
  methodology: {
    type: 'methodology',
    slug: 'methodology',
    routePath: '/methodology',
    title: 'Scientific Methodology & Formulas',
    metaDescription: 'Scientific methodology, peer-reviewed equations, and biomechanical models powering the ZenFit Tools 19 calculators.',
    effectiveDate: 'Peer-Reviewed Consensus · 2026 Edition',
    sections: [
      {
        heading: '1. Evidence-Based Physiological Foundations',
        paragraphs: [
          'ZenFit Tools rejects arbitrary rules of thumb in favor of validated clinical formulas published in leading exercise science and clinical nutrition journals. Every calculator implements exact peer-reviewed mathematical models:',
        ],
        bullets: [
          'Metabolic Burn: Mifflin-St Jeor (1990) and Katch-McArdle equations validated by the Academy of Nutrition and Dietetics.',
          'Circumference Anthropometry: US Navy Hodgdon & Beckett (1984) logarithmic regression model adopted by the US Department of Defense.',
          'Muscular Limits & FFMI: Kouri et al. (1995) 157-athlete baseline study and Dr. Casey Butt’s anthropometric frame analysis.',
          'Cardiovascular Zones: Tanaka et al. (2001) meta-analysis of 18,712 subjects combined with Karvonen Heart Rate Reserve equations.',
          'Endurance Pacing: Pete Riegel (1981) fatigue exponent model (T2 = T1 × (D2/D1)^1.06).',
          'Exercise Expenditure: Ainsworth et al. Compendium of Physical Activities Metabolic Equivalent of Task (MET) database.',
        ],
      },
      {
        heading: '2. Transparency & Academic Inquiries',
        paragraphs: [
          'We maintain full transparency regarding all equations, coefficient multipliers, and clinical assumptions. For questions, citations, or academic inquiries, please contact our physiology research team at zenfittools@gmail.com.',
        ],
      },
    ],
  },
};
