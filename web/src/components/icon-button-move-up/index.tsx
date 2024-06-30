import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgUploadSolid from 'icons/UploadSolid';

export interface IconButtonMoveUpProps extends IconButtonProps {}

export const IconButtonMoveUp = (props: IconButtonMoveUpProps) => (
  <IconButton svg={SvgUploadSolid} title="Mover hacia arriba" {...props} />
);
