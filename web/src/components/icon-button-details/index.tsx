import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgFileAlt from 'icons/FileAlt';

export interface IconButtonDetailsProps extends IconButtonProps {}

export const IconButtonDetails = (props: IconButtonDetailsProps) => (
  <IconButton svg={SvgFileAlt} title="Ver detalles" {...props} />
);
