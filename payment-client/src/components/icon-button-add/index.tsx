import { IconAdd } from 'components/icon-add';
import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonAddProps extends IconButtonProps {}

export const IconButtonAdd = (props: IconButtonAddProps) => (
  <IconButton svg={IconAdd} title="Nuevo" {...props} />
);
