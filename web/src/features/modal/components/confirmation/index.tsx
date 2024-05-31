import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { Emergent, EmergentProps } from '../emergent';

export interface ConfirmationProps extends EmergentProps {}

export const Confirmation = ({ useProps }: ConfirmationProps) => {
  const useEmergentProps: typeof useProps = () => {
    const props = useProps();

    return {
      title: 'Confirmación',
      content: '<Mensaje de confirmación>',
      primaryBtn: (
        <Button
          label="Confirmar"
          variant="primary"
          onClick={() => {
            alert('Some confirmation message');
          }}
        />
      ),
      secondaryBtn: <ButtonClose />,
      ...props,
    };
  };

  return <Emergent useProps={useEmergentProps} />;
};

export default Confirmation;
