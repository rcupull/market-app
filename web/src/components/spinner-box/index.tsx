import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SpinnerBoxProps extends StyleProps {}

export const SpinnerBox = ({ className }: SpinnerBoxProps) => {
  return (
    <div
      className={cn(
        'bg-white opacity-50 cursor-not-allowed absolute inset-0 flex items-center justify-center',
        className,
      )}
    >
      <SpinnerEllipsis />
    </div>
  );
};
