import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessMarketLogoProps extends StyleProps {}

export const BusinessMarketLogo = ({ className }: BusinessMarketLogoProps) => (
  <div className={cn('px-2 py-0.5 rounded-full bg-white h-12 sm:h-14', className)}>
    <img className="h-full" src="/logo.png" alt="Market Logo" />
  </div>
);
