import SvgImage from 'icons/Image';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface EmptyImageProps extends StyleProps {}

export const EmptyImage = ({ className }: EmptyImageProps) => {
  return <SvgImage className={cn('fill-gray-300', className)} />;
};
