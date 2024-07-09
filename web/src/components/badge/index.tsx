import { useMemo } from 'react';

import SvgExclamationTriangleSolid from 'icons/ExclamationTriangleSolid';
import SvgInfoCircleSolid from 'icons/InfoCircleSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { cn } from 'utils/general';

export interface BadgeProps {
  className?: string;
  variant: 'error' | 'info' | 'success' | 'warning' | 'cart';
}

export const Badge = ({ variant, className }: BadgeProps) => {
  const IconComponent = useMemo(() => {
    if (variant === 'error') return SvgExclamationTriangleSolid;
    if (variant === 'success') return SvgInfoCircleSolid;
    if (variant === 'info') return SvgInfoCircleSolid;
    if (variant === 'warning') return SvgExclamationTriangleSolid;
    if (variant === 'cart') return SvgShoppingCartSolid;

    return () => null;
  }, [variant]);

  return (
    <div
      className={cn(
        'flex size-12 flex-shrink-0 items-center justify-center rounded-full',
        {
          ['bg-red-100']: variant == 'error',
          ['bg-green-100']: variant == 'success',
          ['bg-blue-100']: variant == 'info',
          ['bg-yellow-200']: variant == 'warning',
          ['bg-gray-200']: variant == 'cart',
        },
        className,
      )}
    >
      <IconComponent
        className={cn('size-8', {
          ['fill-red-600']: variant == 'error',
          ['fill-green-600']: variant == 'success',
          ['fill-blue-600']: variant == 'info',
          ['fill-yellow-600']: variant == 'warning',
          ['fill-gray-600']: variant == 'cart',
        })}
        aria-hidden="true"
      />
    </div>
  );
};
