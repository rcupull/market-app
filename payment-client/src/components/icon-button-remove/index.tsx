import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconRemove } from 'components/icon-remove';

export interface IconButtonRemoveProps extends IconButtonProps {}

export const IconButtonRemove = (props: IconButtonRemoveProps) => (
  <IconButton svg={IconRemove} title="Eliminar" {...props} />
);
