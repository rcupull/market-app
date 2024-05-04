import SvgPlusCircleSolid from 'icons/PlusCircleSolid';
import { StyleProps } from 'types/general';
export interface IconAddProps extends StyleProps {}

export const IconAdd = ({ className }: IconAddProps) => (
  <SvgPlusCircleSolid className={className} />
);
