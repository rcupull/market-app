import { Badge, BadgeProps } from 'components/badge';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface HighlightedBoxProps extends StyleProps {
  children: React.ReactNode;
  variant: 'warning' | 'info' | 'success' | 'error' | 'neutral';
}

export const HighlightedBox = ({ children, className, variant }: HighlightedBoxProps) => {
  const getBadgeVariant = (): BadgeProps['variant'] => {
    if (variant === 'warning') return 'warning';
    if (variant === 'info') return 'info';
    if (variant === 'success') return 'success';
    if (variant === 'error') return 'error';
    if (variant === 'neutral') return 'info';

    return 'warning';
  };
  return (
    <div
      className={cn(
        'w-full p-3 ring-2 gap-2 rounded-lg flex flex-col sm:flex-row items-center sm:items-start',
        {
          'ring-yellow-500': variant === 'warning',
          'ring-gray-500': variant === 'neutral',
          'ring-green-500': variant === 'success',
        },
        className,
      )}
    >
      <Badge variant={getBadgeVariant()} />
      {children}
    </div>
  );
};
