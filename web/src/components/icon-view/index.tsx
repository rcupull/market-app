import SvgExternalLinkAltSolid from 'icons/ExternalLinkAltSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconViewProps extends StyleProps {}

export const IconView = ({ className }: IconViewProps) => (
  <SvgExternalLinkAltSolid className={cn('!fill-gray-700', className)} />
);
