import { allColorMeta } from 'constants/posts';
import { StyleProps } from 'types/general';
import { PostColor } from 'types/post';
import { cn } from 'utils/general';

export interface ColorCircleProps extends StyleProps {
  postColor: PostColor;
  checked?: boolean;
  error?: boolean;
  size?: 'small' | 'medium';
}

export const ColorCircle = ({
  className,
  postColor,
  checked,
  error,
  size = 'medium',
}: ColorCircleProps) => {
  const { bgColor, selectedRingColor } = allColorMeta[postColor];

  return (
    <div
      className={cn(
        'rounded-full p-0.5',
        {
          'ring-2 ring-red-500': !!error,
          'ring-2 ring-indigo-600': checked,
        },
        className
      )}
    >
      <div
        className={cn(
          bgColor,
          selectedRingColor,
          'rounded-full border border-black border-opacity-30',
          {
            'size-4': size === 'small',
            'size-8': size === 'medium',
          }
        )}
      />
    </div>
  );
};
