import { Button, ButtonProps } from 'components/button';

import { cn } from 'utils/general';

export interface IconButtonProps extends ButtonProps {
  dark?: boolean;
}

export const IconButton = ({ className, variant, dark, ...omittedProps }: IconButtonProps) => (
  <Button
    {...omittedProps}
    className={cn(
      '!rounded-full !p-2 !ring-0',
      {
        ['text-red-600 hover:bg-red-50']: variant === 'error',
        ['text-indigo-600 hover:bg-indigo-50']: variant === 'primary',
        ['!text-gray-400 !hover:bg-gray-600 !bg-transparent']: dark,
      },
      className,
    )}
    variant="outlined"
  />
);
