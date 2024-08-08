import { IconButton, IconButtonProps } from 'components/icon-button';
import { IconShowHide } from 'components/icon-show-hide';

export interface IconButtonShowHideProps extends IconButtonProps {
  hidden?: boolean;
}

export const IconButtonShowHide = ({ hidden, ...props }: IconButtonShowHideProps) => {
  const title = hidden ? 'Mostrar' : 'Ocultar';

  return (
    <IconButton
      svg={({ className }) => <IconShowHide hidden={hidden} className={className} />}
      title={title}
      {...props}
    />
  );
};
