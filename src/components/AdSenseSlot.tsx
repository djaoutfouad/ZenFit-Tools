import React from 'react';

export type AdSlotPosition =
  | 'left_rail'
  | 'right_rail'
  | 'top_leaderboard'
  | 'mid_content'
  | 'pre_footer';

interface AdSenseSlotProps {
  position: AdSlotPosition;
  id?: string;
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  position,
  id,
  className = '',
}) => {
  // Safe-zone spacing of at least 32px (my-8 = 32px) from interactive controls
  if (position === 'left_rail') {
    return (
      <aside
        id={id || 'ad-slot-left-rail'}
        aria-label="Advertisement left rail"
        className={`hidden xl:flex flex-col items-center justify-center w-[160px] h-[600px] sticky top-24 bg-slate-100/90 border border-dashed border-slate-300 rounded-xl my-8 transition-colors ${className}`}
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 select-none rotate-180 writing-mode-vertical">
          ADVERTISEMENT
        </span>
      </aside>
    );
  }

  if (position === 'right_rail') {
    return (
      <aside
        id={id || 'ad-slot-right-rail'}
        aria-label="Advertisement right rail"
        className={`hidden xl:flex flex-col items-center justify-center w-[160px] h-[600px] sticky top-24 bg-slate-100/90 border border-dashed border-slate-300 rounded-xl my-8 transition-colors ${className}`}
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 select-none writing-mode-vertical">
          ADVERTISEMENT
        </span>
      </aside>
    );
  }

  if (position === 'top_leaderboard') {
    return (
      <div
        id={id || 'ad-slot-top-leaderboard'}
        aria-label="Advertisement top leaderboard"
        className={`w-full flex justify-center items-center my-8 px-4 ${className}`}
      >
        <div className="w-full max-w-[728px] h-[90px] bg-slate-100/90 border border-dashed border-slate-300 rounded-2xl flex items-center justify-center transition-colors">
          <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 select-none">
            ADVERTISEMENT
          </span>
        </div>
      </div>
    );
  }

  if (position === 'mid_content') {
    return (
      <div
        id={id || 'ad-slot-mid-content'}
        aria-label="Advertisement mid content"
        className={`w-full flex justify-center items-center my-8 ${className}`}
      >
        <div className="w-full max-w-[728px] min-h-[100px] py-6 bg-slate-100/90 border border-dashed border-slate-300 rounded-2xl flex items-center justify-center transition-colors">
          <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 select-none">
            ADVERTISEMENT
          </span>
        </div>
      </div>
    );
  }

  // Pre-footer banner
  return (
    <div
      id={id || 'ad-slot-pre-footer'}
      aria-label="Advertisement pre footer"
      className={`w-full flex justify-center items-center my-8 px-4 ${className}`}
    >
      <div className="w-full max-w-[728px] h-[90px] bg-slate-100/90 border border-dashed border-slate-300 rounded-2xl flex items-center justify-center transition-colors">
        <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 select-none">
          ADVERTISEMENT
        </span>
      </div>
    </div>
  );
};
