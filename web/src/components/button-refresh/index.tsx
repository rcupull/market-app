import { Button, ButtonProps } from 'components/button';

export interface ButtonRefreshProps extends ButtonProps {}

export const ButtonRefresh = (props: ButtonRefreshProps) => (
  <Button label="Actualizar" variant="outlined" {...props} />
);
