import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconRefresh } from 'components/icon-refresh';

export interface IconButtonRefreshProps extends IconButtonProps {}

export const IconButtonRefresh = (props: IconButtonRefreshProps) => (
  <IconButton svg={IconRefresh} title="Actualizar" {...props} />
);
