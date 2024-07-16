import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessMarketBrandProps extends StyleProps {}

export const BusinessMarketBrand = ({ className }: BusinessMarketBrandProps) => (
  <img className={cn('h-36 sm:h-48', className)} src="/logo-2.png" alt="Market Logo" />
);
