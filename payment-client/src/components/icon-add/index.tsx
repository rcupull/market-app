import SvgPlusCircleSolid from 'icons/PlusCircleSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
export interface IconAddProps extends StyleProps {}

export const IconAdd = ({ className }: IconAddProps) => (
  <SvgPlusCircleSolid className={cn('fill-blue-700', className)} />
);
