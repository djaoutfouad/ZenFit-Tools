import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

if (typeof window !== 'undefined') {
  (window as any).__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ =
    (window as any).__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ || {};
}

export const createRoot = ViteReactSSG({ routes });
