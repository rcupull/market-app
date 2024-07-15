import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgMapMarkerSolid from 'icons/MapMarkerSolid';
import { cn } from 'utils/general';

export interface IconButtonLocationProps extends IconButtonProps {
  size?: 'small' | 'large' | 'medium';
}

export const IconButtonLocation = ({ size = 'small', ...props }: IconButtonLocationProps) => (
  <IconButton
    svg={({ className }) => (
      <SvgMapMarkerSolid
        className={cn('fill-indigo-600', className, {
          '!size-5': size === 'small',
          '!size-10': size === 'medium',
          '!size-16': size === 'large',
        })}
      />
    )}
    title="Ubicación"
    {...props}
  />
);
