import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconUpdateProps extends StyleProps {}

export const IconUpdate = ({ className }: IconUpdateProps) => (
  <PencilSquareIcon className={cn('!text-blue-700', className)} />
);
