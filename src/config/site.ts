/**
 * Centralized Site Configuration for ZenFit Tools
 *
 * Current testing stage URL: https://zenfit-tools.pages.dev
 * When a custom domain is purchased, updating SITE_URL here (or via VITE_SITE_URL)
 * centrally updates canonical links, sitemaps, robots.txt references, Schema.org,
 * and Open Graph metadata in one single location.
 */

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || 'https://zenfit-tools.pages.dev';
export const SITE_NAME = 'ZenFit Tools';
export const SITE_TAGLINE = 'Evidence-Based Sports Science & Clinical Physiology Suite';
export const CONTACT_EMAIL = 'zenfittools@gmail.com';

/**
 * Returns a canonical URL for any internal route.
 * Guarantees standard formatting without double slashes or trailing slashes.
 */
export function getCanonicalUrl(path: string = ''): string {
  const base = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  if (!path || path === '/') {
    return base;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
