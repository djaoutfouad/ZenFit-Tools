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

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calc,
  isSelected = false,
}) => {
  const Icon: LucideIcon = TOOL_ICONS[calc.id] || Activity;

  return (
    <Link
      id={`calc-card-${calc.id}`}
      to={calc.routePath}
      className={`group rounded-3xl border p-6 transition-all duration-300 ease-out flex flex-col justify-between block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        isSelected
          ? 'bg-amber-500/5 border-amber-500 shadow-md ring-2 ring-amber-400/20'
          : 'bg-white border-slate-200/90 shadow-sm hover:border-amber-400/70 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Header with Icon and Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2">
            {calc.readTime && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                <Clock className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors" />
                <span>{calc.readTime}</span>
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
              {calc.badge}
            </span>
            {isSelected && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
          {calc.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 mb-5 line-clamp-2 leading-relaxed">
          {calc.shortDescription}
        </p>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
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
    </Link>
  );
};
