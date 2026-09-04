import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CalculatorMeta } from '../types';

interface CalculatorCardProps {
  calc: CalculatorMeta;
  isSelected?: boolean;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calc,
  isSelected = false,
}) => {
  return (
    <Link
      to={calc.routePath}
      id={`calc-card-${calc.id}`}
      className={`group p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between block ${
        isSelected
          ? 'bg-amber-500/5 border-amber-500 shadow-md ring-2 ring-amber-400/20'
          : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
            {calc.badge}
          </span>
          {isSelected && (
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
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
          className="p-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1 transition-all text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950"
        >
          <span>Calculate</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
};
