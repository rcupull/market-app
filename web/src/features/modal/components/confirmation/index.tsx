import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { Emergent, EmergentProps } from '../emergent';

import { cn } from 'utils/general';

export interface ConfirmationProps extends EmergentProps {}

export const Confirmation = ({ useProps }: ConfirmationProps) => {
  const useEmergentProps: typeof useProps = () => {
    const props = useProps();

    return {
      title: 'Confirmación',
      content: '<Mensaje de confirmación>',
      windowType: 'confirmation',
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
      className: cn('border-2 border-gray-300', props.className),
    };
  };

  return <Emergent useProps={useEmergentProps} />;
};

export default Confirmation;
