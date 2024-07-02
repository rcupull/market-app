import SvgStarSolid from 'icons/StarSolid';
import { StyleProps } from 'types/general';
import { cn, isNumber } from 'utils/general';

export interface ReviewProps extends StyleProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const ReviewAverage = ({ value, onChange, className }: ReviewProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      {[0, 1, 2, 3, 4].map((rating, index) => (
        <div key={index} onClick={() => onChange?.(index + 1)}>
          <SvgStarSolid
            className={cn(
              isNumber(value) && value > rating ? 'fill-yellow-400' : 'fill-gray-200',
              'h-5 w-5 flex-shrink-0'
            )}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
};
