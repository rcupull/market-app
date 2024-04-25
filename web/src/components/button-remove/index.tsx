import { Button, ButtonProps } from 'components/button';

export interface ButtonRemoveProps extends ButtonProps {}

export const ButtonRemove = (props: ButtonRemoveProps) => (
  <Button label="Eliminar" {...props} variant="error" />
);
