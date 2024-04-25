import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import { cn } from 'utils/general';

export interface BadgeProps {
  className?: string;
  variant: 'error' | 'info' | 'success' | 'warning' | 'cart';
}

export const Badge = ({ variant, className }: BadgeProps) => {
  const IconComponent = useMemo(() => {
    if (variant === 'error') return ExclamationTriangleIcon;
    if (variant === 'success') return CheckCircleIcon;
    if (variant === 'info') return InformationCircleIcon;
    if (variant === 'warning') return ExclamationTriangleIcon;
    if (variant === 'cart') return ShoppingCartIcon;

    return () => null;
  }, [variant]);

  return (
    <div
      className={cn(
        'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full',
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
        className={cn('h-6 w-6', {
          ['text-red-600']: variant == 'error',
          ['text-green-600']: variant == 'success',
          ['text-blue-600']: variant == 'info',
          ['text-yellow-600']: variant == 'warning',
          ['text-gray-600']: variant == 'cart',
        })}
        aria-hidden="true"
      />
    </div>
  );
};
