import { ColorCircle, ColorCircleProps } from 'components/color-circle';

import { StyleProps } from 'types/general';
import { PostColor } from 'types/post';
import { cn } from 'utils/general';

export interface ColorCircleGroupProps extends StyleProps {
  value?: Array<PostColor>;
  size?: ColorCircleProps['size'];
}

export const ColorCircleGroup = ({ className, value, size }: ColorCircleGroupProps) => {
  if (!value?.length) return <></>;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="text-sm font-semibold">Colores:</span>
      {value.map((postColor, index) => (
        <ColorCircle size={size} key={index} postColor={postColor} />
      ))}
    </div>
  );
};
