import { IconButton, IconButtonProps } from 'components/icon-button';

import SvgBarsSolid from 'icons/BarsSolid';

export interface IconButtonOptionsBarsProps extends IconButtonProps {}

export const IconButtonOptionsBars = (props: IconButtonOptionsBarsProps) => (
  <IconButton svg={SvgBarsSolid} title="Opciones" {...props} />
);
