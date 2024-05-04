import SvgPencilAltSolid from 'icons/PencilAltSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconUpdateProps extends StyleProps {}

export const IconUpdate = ({ className }: IconUpdateProps) => (
  <SvgPencilAltSolid className={cn('!fill-blue-700', className)} />
);
