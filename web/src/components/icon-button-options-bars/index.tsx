import { Bars3Icon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonOptionsBarsProps extends IconButtonProps {}

export const IconButtonOptionsBars = (props: IconButtonOptionsBarsProps) => (
  <IconButton svg={Bars3Icon} title="Opciones" {...props} />
);
