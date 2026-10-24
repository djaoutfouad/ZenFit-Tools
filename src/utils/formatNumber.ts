/**
 * Central Number Formatting & Input Sanitization Helper for ZenFit Tools
 *
 * Guarantees standard English (Western Arabic: 0 1 2 3 4 5 6 7 8 9) numerals
 * and Western decimal point (.) regardless of the user's browser locale or keyboard
 * (e.g. ar-EG, ar-SA, fa-IR).
 */

const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts Eastern Arabic (٠-٩) and Persian (۰-۹) digits and localized decimal
 * separators (٫, ،, ,) into standard Western digits (0-9) and decimal point (.).
 */
export function sanitizeNumericString(rawValue: string | number): string {
  if (typeof rawValue === 'number') {
    return isNaN(rawValue) || !isFinite(rawValue) ? '0' : String(rawValue);
  }
  if (rawValue === null || rawValue === undefined) {
    return '';
  }

  let normalized = String(rawValue);

  for (let i = 0; i < 10; i++) {
    normalized = normalized.replace(new RegExp(EASTERN_ARABIC_DIGITS[i], 'g'), String(i));
    normalized = normalized.replace(new RegExp(PERSIAN_DIGITS[i], 'g'), String(i));
  }

  // Normalize Arabic decimal separator (٫), Arabic comma (،), and comma (,) to Western dot (.)
  normalized = normalized.replace(/[٫،,]/g, '.');

  // Strip any character that is not 0-9, ., or -
  normalized = normalized.replace(/[^0-9.-]/g, '');

  // Keep only a leading minus sign if present
  normalized = normalized.replace(/(?!^)-/g, '');

  // Collapse multiple decimal points into the first one
  const parts = normalized.split('.');
  if (parts.length > 2) {
    normalized = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  return normalized;
}

/**
 * Central number input sanitizer applied on onChange across all 19 calculators.
 * Converts Arabic/Indic/Persian numerals and commas into clean finite Western numbers,
 * preventing NaN or Infinity from ever reaching calculation engines.
 */
export function sanitizeNumberInput(rawValue: string | number, fallback = 0): number {
  if (typeof rawValue === 'number') {
    return isNaN(rawValue) || !isFinite(rawValue) ? fallback : rawValue;
  }

  const cleaned = sanitizeNumericString(rawValue);
  if (!cleaned || cleaned === '-' || cleaned === '.' || cleaned === '-.') {
    return fallback;
  }

  const parsed = Number(cleaned);
  return isNaN(parsed) || !isFinite(parsed) ? fallback : parsed;
}

/**
 * Sanitizes HH:MM time strings by converting any Arabic/Persian digits to Western digits.
 */
export function sanitizeTimeInput(rawValue: string): string {
  if (!rawValue || typeof rawValue !== 'string') {
    return '07:00';
  }
  let normalized = rawValue;
  for (let i = 0; i < 10; i++) {
    normalized = normalized.replace(new RegExp(EASTERN_ARABIC_DIGITS[i], 'g'), String(i));
    normalized = normalized.replace(new RegExp(PERSIAN_DIGITS[i], 'g'), String(i));
  }
  return normalized;
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', options).format(value);
}

/**
 * Validates that a string does NOT contain any Eastern Arabic (٠١٢٣٤٥٦٧٨٩)
 * or Persian (۰۱۲۳۴۵۶۷۸۹) digits.
 */
export function containsEasternOrPersianDigits(text: string): boolean {
  return /[٠-٩۰-۹]/.test(text);
}
