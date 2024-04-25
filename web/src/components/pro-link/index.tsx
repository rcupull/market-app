import { Link } from 'react-router-dom';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ProLinkProps extends StyleProps {}

export const ProLink = ({ className }: ProLinkProps) => (
  <Link
    to="/payment-plans"
    className={cn(
      'rounded-full px-0.5 py-1 ring-1 text-xs text-gray-500 bg-yellow-400 ring-yellow-400',
      className,
    )}
    title="Descubre las facilidades de nuestros planes que mejor se adecuan a tu negocio"
  >
    Pro
  </Link>
);
