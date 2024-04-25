import marketLogoSrc from './business-market-logo-image.png';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessMarketLogoProps extends StyleProps {}

export const BusinessMarketLogo = ({ className }: BusinessMarketLogoProps) => (
  <div className={cn('px-2 py-0.5 rounded-full bg-white h-8', className)}>
    <img className="h-full" src={marketLogoSrc} alt="Market Logo" />
  </div>
);
