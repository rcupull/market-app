import { Button, ButtonProps } from 'components/button';

export interface ButtonSaveProps extends ButtonProps {}

export const ButtonSave = (props: ButtonSaveProps) => {
  return <Button label="Guardar" variant="primary" {...props} />;
};
