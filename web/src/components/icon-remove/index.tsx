import { TrashIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconRemoveProps extends StyleProps {}

export const IconRemove = ({ className }: IconRemoveProps) => (
  <TrashIcon className={cn('!text-red-600', className)} />
);
