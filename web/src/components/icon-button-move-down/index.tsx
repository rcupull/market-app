import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgUploadSolid from 'icons/UploadSolid';
import { cn } from 'utils/general';

export interface IconButtonMoveDownProps extends IconButtonProps {}

export const IconButtonMoveDown = (props: IconButtonMoveDownProps) => (
  <IconButton
    svg={({ className }) => <SvgUploadSolid className={cn('rotate-180', className)} />}
    title="Mover hacia abajo"
    {...props}
  />
);
