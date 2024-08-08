import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconUpdate } from 'components/icon-update';

export interface IconButtonUpdateProps extends IconButtonProps {}

export const IconButtonUpdate = (props: IconButtonUpdateProps) => (
  <IconButton svg={IconUpdate} title="Editar" {...props} />
);
