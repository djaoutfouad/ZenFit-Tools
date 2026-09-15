/**
 * Central Number Formatting Helper for ZenFit Tools
 *
 * Guarantees standard English (Western Arabic: 0 1 2 3 4 5 6 7 8 9) numerals
 * regardless of the user's browser locale (e.g. ar-EG, ar-SA, fa-IR).
 */

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
