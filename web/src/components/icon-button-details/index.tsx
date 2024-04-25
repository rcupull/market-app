import { DocumentTextIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonDetailsProps extends IconButtonProps {}

export const IconButtonDetails = (props: IconButtonDetailsProps) => (
  <IconButton svg={DocumentTextIcon} title="Ver detalles" {...props} />
);
