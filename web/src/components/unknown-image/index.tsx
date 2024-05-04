import SvgImage from 'icons/Image';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UnknownImageProps extends StyleProps {}
export const UnknownImage = ({ className }: UnknownImageProps) => {
  return (
    <div className={cn('flex items-center justify-center h-64 w-64', className)}>
      <SvgImage className="h-32 w-32 text-gray-400" />
    </div>
  );
};
