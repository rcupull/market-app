import SvgCopySolid from 'icons/CopySolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconDuplicateProps extends StyleProps {}

export const IconDuplicate = ({ className }: IconDuplicateProps) => (
  <SvgCopySolid className={cn('!fill-green-800', className)} />
);
