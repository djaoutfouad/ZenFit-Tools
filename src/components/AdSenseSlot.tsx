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

// AdSense is disabled by default and strictly disabled in development mode
const isDev = Boolean(import.meta.env.DEV);
const SHOW_ADS = !isDev && false;
const ADSENSE_CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  position,
  id,
  className = '',
}) => {
  if (isDev || !SHOW_ADS) {
    return null;
  }

  return (
    <div className={`adsense-wrapper my-6 flex justify-center w-full ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={id || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
