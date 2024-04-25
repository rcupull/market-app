import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconView } from 'components/icon-view';

export interface IconButtonViewProps extends IconButtonProps {}

export const IconButtonView = (props: IconButtonViewProps) => (
  <IconButton svg={IconView} title="Ver la página" {...props} />
);
