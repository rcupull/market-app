import SvgTrashAltSolid from 'icons/TrashAltSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconRemoveProps extends StyleProps {}

export const IconRemove = ({ className }: IconRemoveProps) => (
  <SvgTrashAltSolid className={cn('!fill-red-600', className)} />
);
