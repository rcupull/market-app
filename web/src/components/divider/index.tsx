import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface DividerProps extends StyleProps {
  narrow?: boolean;
}

export const Divider = ({ className, narrow }: DividerProps) => {
  return (
    <div
      className={cn(
        'w-full border-t-2 border-gray-300',
        {
          'mt-8 mb-4': !narrow,
          'my-1': narrow,
        },
        className,
      )}
    />
  );
};
