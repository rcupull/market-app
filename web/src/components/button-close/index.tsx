import { Button, ButtonProps } from 'components/button';

import { onCloseCheckingChangeBackDrop } from 'features/modal/closeContext/CloseContextProvider';

export interface ButtonCloseProps extends ButtonProps {}

export const ButtonClose = (props: ButtonCloseProps) => {
  return (
    <Button
      label="Cerrar"
      onClick={onCloseCheckingChangeBackDrop}
      {...props}
      variant="outlined"
    />
  );
};
