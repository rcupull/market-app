import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconDuplicateProps extends StyleProps {}

export const IconDuplicate = ({ className }: IconDuplicateProps) => (
  <DocumentDuplicateIcon className={cn('!text-green-800', className)} />
);
