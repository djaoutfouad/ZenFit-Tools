export type UnitSystem = 'metric' | 'imperial';

export type CalculatorCategory =
  | 'all'
  | 'metabolism'
  | 'body_composition'
  | 'performance'
  | 'biohacking';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorMeta {
  id: string;
  slug: string;
  routePath: string;
  title: string;
  shortDescription: string;
  category: CalculatorCategory;
  badge: string;
  formulaSummary: string;
  detailedFormulaHtml: string;
  scientificGuidelines: string[];
  scientificReferences: string[];
  safetyDisclosures: string[];
  faqs: FAQItem[];
}

export type LegalDocType = 'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'methodology';

export interface CategoryMeta {
  id: CalculatorCategory;
  slug: string;
  routePath: string;
  title: string;
  shortDescription: string;
  badge: string;
}
