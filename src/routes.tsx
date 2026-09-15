import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CategoryPage } from './pages/CategoryPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { CALCULATORS_CATALOG, CATEGORIES_CATALOG } from './data/calculatorsData';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // 19 Dedicated Calculator Routes
      ...CALCULATORS_CATALOG.map((calc) => ({
        path: calc.routePath.replace(/^\//, ''),
        element: <CalculatorPage calc={calc} />,
      })),
      {
        path: 'calculators/:slug',
        element: <CalculatorPage />,
      },
      // 4 Category Hub Routes
      ...CATEGORIES_CATALOG.map((cat) => ({
        path: cat.routePath.replace(/^\//, ''),
        element: <CategoryPage category={cat} />,
      })),
      {
        path: 'categories/:categorySlug',
        element: <CategoryPage />,
      },
      // Static Legal & Contact Pages
      {
        path: 'privacy',
        element: <LegalPage docType="privacy" />,
      },
      {
        path: 'terms',
        element: <LegalPage docType="terms" />,
      },
      {
        path: 'cookies',
        element: <LegalPage docType="cookies" />,
      },
      {
        path: 'disclaimer',
        element: <LegalPage docType="disclaimer" />,
      },
      {
        path: 'methodology',
        element: <LegalPage docType="methodology" />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
];
