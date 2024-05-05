import { Button, ButtonProps } from 'components/button';

import { cn } from 'utils/general';

export interface IconButtonProps extends ButtonProps {}

export const IconButton = ({ className, variant, ...omittedProps }: IconButtonProps) => (
  <Button
    {...omittedProps}
    className={cn(
      '!rounded-full !p-2 !ring-0 !shadow-none',
      {
        ['text-red-600 !hover:bg-red-50']: variant === 'error',
        ['text-indigo-600 !hover:bg-indigo-50']: variant === 'primary',
      },
      className,
    )}
    variant="outlined"
  />
);
