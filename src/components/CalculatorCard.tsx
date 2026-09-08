import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  PieChart,
  Ruler,
  Dumbbell,
  HeartPulse,
  Timer,
  Hourglass,
  Droplets,
  FlaskConical,
  Target,
  Scale,
  TrendingUp,
  Activity,
  Zap,
  Moon,
  UtensilsCrossed,
  RefreshCw,
  Heart,
  LucideIcon,
} from 'lucide-react';
import { CalculatorMeta } from '../types';

interface CalculatorCardProps {
  calc: CalculatorMeta;
  isSelected?: boolean;
}

const TOOL_ICONS: Record<string, LucideIcon> = {
  tdee: Flame,
  macros: PieChart,
  navy_body_fat: Ruler,
  one_rep_max: Dumbbell,
  heart_rate_zones: HeartPulse,
  running_pace: Timer,
  intermittent_fasting: Hourglass,
  hydration: Droplets,
  creatine: FlaskConical,
  ffmi: Target,
  ideal_weight: Scale,
  muscular_potential: TrendingUp,
  whtr: Activity,
  calories_burned: Zap,
  sleep_cycles: Moon,
  bmr_comparative: Flame,
  protein_timing: UtensilsCrossed,
  body_recomposition: RefreshCw,
  hrr_zones: Heart,
};

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  metabolism: Flame,
  performance: Dumbbell,
  biohacking: Droplets,
  body_composition: Scale,
  strength: Dumbbell,
  hydration: Droplets,
  all: Activity,
};

export const getCategoryIcon = (category?: string): LucideIcon => {
  if (!category) return Activity;
  return CATEGORY_ICONS[category] || Activity;
};

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calc,
  isSelected = false,
}) => {
  // Map appropriate Lucide React icon based on category:
  // 'metabolism' -> Flame
  // 'performance' / strength -> Dumbbell
  // 'biohacking' / hydration -> Droplets
  // 'body_composition' -> Scale
  const Icon: LucideIcon =
    (calc.category && CATEGORY_ICONS[calc.category]) ||
    TOOL_ICONS[calc.id] ||
    Activity;

  return (
    <Link
      to={calc.routePath}
      id={`calc-card-${calc.id}`}
      className={`group rounded-3xl border overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-amber-500/5 border-amber-500 shadow-md ring-2 ring-amber-400/20'
          : 'bg-white border-slate-200/90 shadow-sm hover:border-amber-400/70 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 hover:scale-102'
      }`}
    >
      {/* Persona Image Header */}
      {calc.personaImageUrl && (
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={calc.personaImageUrl}
            alt={calc.personaRole ? `${calc.personaRole} - ${calc.title}` : calc.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

          {/* Floating Thematic Icon Badge */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-400 transition-all duration-300"
            aria-hidden="true"
          >
            <Icon className="w-4 h-4" />
          </div>

          {/* Persona Role Pill Badge */}
          {calc.personaRole && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950/85 text-slate-200 border border-slate-700/70 backdrop-blur-sm shadow-sm max-w-full transition-colors duration-300 group-hover:border-amber-500/40 group-hover:bg-slate-950">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
                <span className="truncate">{calc.personaRole}</span>
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-transparent group-hover:bg-amber-50 group-hover:text-amber-800 group-hover:border-amber-200/60 transition-all duration-200">
                <Icon className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700 transition-colors flex-shrink-0" />
                {calc.badge}
              </span>
              {calc.readTime && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                  <Clock className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  <span>{calc.readTime}</span>
                </span>
              )}
            </div>
            {isSelected && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
            {calc.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {calc.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
            {calc.formulaSummary}
          </span>
          <span
            id={`launch-calc-btn-${calc.id}`}
            className="p-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 text-slate-700 bg-slate-50 border border-slate-200/80 group-hover:border-amber-400/50 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-sm"
          >
            <span>Calculate</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
          </span>
        </div>
      </div>
    </Link>
  );
};
