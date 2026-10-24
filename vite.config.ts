import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    ssgOptions: {
      script: 'async',
      formatting: 'none',
      dirStyle: 'nested',
      onPageRendered(_route: string, renderedHTML: string) {
        // Ensure <meta charset="UTF-8"> and <meta name="viewport"> are the very first elements immediately after <head> (within first 100 bytes for W3C)
        let html = renderedHTML
          .replace(/<meta\s+charset=["']?utf-8["']?\s*\/?>\s*/gi, '')
          .replace(/<meta\s+name=["']viewport["'][^>]*>\s*/gi, '');
        html = html.replace(
          /<head>/i,
          '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
        );
        return html;
      },
      includedRoutes() {
        return [
          '/',
          // 19 Dedicated Calculator Routes
          '/calculators/tdee-daily-calorie-burn',
          '/calculators/advanced-macronutrient-split',
          '/calculators/us-navy-body-fat-percentage',
          '/calculators/one-rep-max-strength-standards',
          '/calculators/target-heart-rate-training-zones',
          '/calculators/running-pace-race-predictor',
          '/calculators/intermittent-fasting-autophagy',
          '/calculators/daily-water-hydration-intake',
          '/calculators/creatine-loading-dosage',
          '/calculators/lean-body-mass-ffmi',
          '/calculators/ideal-body-weight-frame-size',
          '/calculators/maximum-muscular-potential',
          '/calculators/waist-to-height-ratio-whtr',
          '/calculators/calories-burned-per-exercise',
          '/calculators/sleep-cycle-circadian-wake-up',
          '/calculators/basal-metabolic-rate-bmr-comparative',
          '/calculators/protein-intake-timing-distribution',
          '/calculators/body-recomposition-caloric-planner',
          '/calculators/heart-rate-reserve-hrr-zones',
          // 4 Category Hubs
          '/categories/metabolism-diet',
          '/categories/body-composition',
          '/categories/cardio-strength',
          '/categories/biohacking-recovery',
          // Static Legal & Contact Pages
          '/privacy',
          '/terms',
          '/cookies',
          '/disclaimer',
          '/methodology',
          '/about',
          '/contact',
        ];
      },
    },
  };
});
