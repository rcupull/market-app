import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconViewProps extends StyleProps {}

export const IconView = ({ className }: IconViewProps) => (
  <ArrowTopRightOnSquareIcon className={cn('!text-gray-700', className)} />
);
