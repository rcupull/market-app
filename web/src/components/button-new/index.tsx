import { Button, ButtonProps } from 'components/button';

export interface ButtonNewProps extends ButtonProps {}

export const ButtonNew = (props: ButtonNewProps) => <Button label="Nuevo" {...props} />;
