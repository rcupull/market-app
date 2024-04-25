import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconDuplicate } from 'components/icon-duplicate';

export interface IconButtonDuplicateProps extends IconButtonProps {}

export const IconButtonDuplicate = (props: IconButtonDuplicateProps) => (
  <IconButton svg={IconDuplicate} title="Duplicar" {...props} />
);
