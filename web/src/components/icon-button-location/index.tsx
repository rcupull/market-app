import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgMapMarkerSolid from 'icons/MapMarkerSolid';
import { cn } from 'utils/general';

export interface IconButtonLocationProps extends IconButtonProps {}

export const IconButtonLocation = (props: IconButtonLocationProps) => (
  <IconButton
    svg={({ className }) => <SvgMapMarkerSolid className={cn('fill-indigo-600', className)} />}
    title="Ubicación"
    {...props}
  />
);
