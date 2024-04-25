import { PhotoIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface EmptyImageProps extends StyleProps {}

export const EmptyImage = ({ className }: EmptyImageProps) => {
  return <PhotoIcon className={cn('text-gray-300', className)} />;
};
