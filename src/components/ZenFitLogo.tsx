import React from 'react';

interface ZenFitEmblemProps {
  className?: string;
  size?: number | string;
}

export const ZenFitEmblem: React.FC<ZenFitEmblemProps> = ({
  className = 'w-10 h-10',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ZenFit Tools Golden Hexagonal Emblem"
    >
      <defs>
        {/* Gold Metallic Outer Gradient */}
        <linearGradient id="zfGoldHexOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="75%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Gold Metallic Inner Stroke Gradient */}
        <linearGradient id="zfGoldHexInner" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Deep Luxury Hexagon Background */}
        <radialGradient id="zfHexBackground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1914" />
          <stop offset="75%" stopColor="#0c0a09" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Gold Bars Gradient */}
        <linearGradient id="zfGoldBars" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#78350F" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#D97706" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Glowing DNA Helix & Arrow Gradient */}
        <linearGradient id="zfGoldHelix" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="20%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="80%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>

        {/* Soft Gold Drop Shadow Glow Filter */}
        <filter id="zfGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F59E0B" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Hexagon Base Background */}
      <path
        d="M 50 5.5 Q 53 7 83.5 24.5 Q 87 26.5 87 31 L 87 69 Q 87 73.5 83.5 75.5 L 53 93 Q 50 94.5 47 93 L 16.5 75.5 Q 13 73.5 13 69 L 13 31 Q 13 26.5 16.5 24.5 L 47 7 Q 50 5.5 50 5.5 Z"
        fill="url(#zfHexBackground)"
      />

      {/* Rising Bar Chart Behind DNA (Left Ascending & Right Descending) */}
      <g opacity="0.85">
        {/* Left Ascending Bars */}
        <rect x="20" y="58" width="3.2" height="15" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="25.5" y="50" width="3.2" height="23" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="31" y="42" width="3.2" height="31" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="36.5" y="34" width="3.2" height="39" rx="1.2" fill="url(#zfGoldBars)" />

        {/* Right Ascending/Symmetric Bars */}
        <rect x="60.3" y="34" width="3.2" height="39" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="65.8" y="42" width="3.2" height="31" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="71.3" y="50" width="3.2" height="23" rx="1.2" fill="url(#zfGoldBars)" />
        <rect x="76.8" y="58" width="3.2" height="15" rx="1.2" fill="url(#zfGoldBars)" />
      </g>

      {/* Central Bidirectional Arrow Stem & Heads */}
      <g filter="url(#zfGoldGlow)">
        {/* Top Upward Arrowhead */}
        <polygon points="50,9 43,19 47.2,18.5 47.2,25 52.8,25 52.8,18.5 57,19" fill="url(#zfGoldHelix)" />

        {/* Bottom Downward Arrowhead */}
        <polygon points="50,91 43,81 47.2,81.5 47.2,75 52.8,75 52.8,81.5 57,81" fill="url(#zfGoldHelix)" />

        {/* Central Vertical Vector Axis */}
        <line x1="50" y1="23" x2="50" y2="77" stroke="url(#zfGoldHelix)" strokeWidth="1.8" strokeDasharray="2 1.5" opacity="0.6" />

        {/* DNA Horizontal Base-Pair Rungs */}
        <line x1="43.5" y1="30" x2="56.5" y2="30" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="44" y1="36" x2="56" y2="36" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="50" cy="41" r="1.3" fill="#FFFBEB" />
        <line x1="44" y1="46" x2="56" y2="46" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="43.5" y1="52" x2="56.5" y2="52" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="44" y1="58" x2="56" y2="58" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="50" cy="63" r="1.3" fill="#FFFBEB" />
        <line x1="44" y1="68" x2="56" y2="68" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="43.5" y1="74" x2="56.5" y2="74" stroke="url(#zfGoldHelix)" strokeWidth="1.6" strokeLinecap="round" />

        {/* DNA Strand 1 (Sine Wave A) */}
        <path
          d="M 50 25 C 38 29, 38 37, 50 41 C 62 45, 62 53, 50 57 C 38 61, 38 69, 50 73 C 58 75.5, 58 80, 50 83"
          fill="none"
          stroke="url(#zfGoldHelix)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* DNA Strand 2 (Sine Wave B - Counter Phase) */}
        <path
          d="M 50 25 C 62 29, 62 37, 50 41 C 38 45, 38 53, 50 57 C 62 61, 62 69, 50 73 C 42 75.5, 42 80, 50 83"
          fill="none"
          stroke="url(#zfGoldHelix)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>

      {/* Outer Rounded Hexagon Stroke (Gold Metallic Gradient) */}
      <path
        d="M 50 5.5 Q 53 7 83.5 24.5 Q 87 26.5 87 31 L 87 69 Q 87 73.5 83.5 75.5 L 53 93 Q 50 94.5 47 93 L 16.5 75.5 Q 13 73.5 13 69 L 13 31 Q 13 26.5 16.5 24.5 L 47 7 Q 50 5.5 50 5.5 Z"
        fill="none"
        stroke="url(#zfGoldHexOuter)"
        strokeWidth="4"
        strokeLinejoin="round"
        filter="url(#zfGoldGlow)"
      />

      {/* Inner Subtle Accent Border */}
      <path
        d="M 50 9 Q 52.5 10.5 80.5 26.5 Q 83.5 28 83.5 32 L 83.5 68 Q 83.5 72 80.5 73.5 L 52.5 89.5 Q 50 91 47.5 89.5 L 19.5 73.5 Q 16.5 72 16.5 68 L 16.5 32 Q 16.5 28 19.5 26.5 L 47.5 10.5 Q 50 9 50 9 Z"
        fill="none"
        stroke="url(#zfGoldHexInner)"
        strokeWidth="1.2"
        opacity="0.85"
      />
    </svg>
  );
};

interface ZenFitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const ZenFitLogo: React.FC<ZenFitLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showBadge = true,
  className = '',
}) => {
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    hero: 'text-2xl sm:text-4xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    hero: 'text-xs sm:text-sm',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Golden Hexagonal Emblem */}
      <div className="relative shrink-0 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform duration-200">
        <ZenFitEmblem className={emblemSizes[size]} />
      </div>

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className={`${titleSizes[size]} font-extrabold tracking-tight font-sans text-white flex items-center`}>
            <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              ZenFit
            </span>
            <span className="text-white drop-shadow-sm">.Tools</span>
          </span>

          {showBadge && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 uppercase tracking-wider shadow-sm">
              19 Elite Tools
            </span>
          )}
        </div>

        {showSubtitle && (
          <p className={`${subtitleSizes[size]} text-slate-300 font-medium tracking-normal hidden sm:block mt-0.5`}>
            Physiological &amp; Biohacking Analytics
          </p>
        )}
      </div>
    </div>
  );
};
