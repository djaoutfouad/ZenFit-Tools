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
      className={`group rounded-3xl border overflow-hidden transition-all duration-200 flex flex-col justify-between block ${
        isSelected
          ? 'bg-amber-500/5 border-amber-500 shadow-md ring-2 ring-amber-400/20'
          : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1'
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
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Persona Role Pill Badge */}
          {calc.personaRole && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/90 text-slate-200 border border-slate-700/80 backdrop-blur-sm shadow-md max-w-full">
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
      </div>
    </Link>
  );
};
