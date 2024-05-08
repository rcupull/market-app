import { Button } from 'components/button';
import { Stepper } from 'components/stepper';

import { useModal } from 'features/modal/useModal';

import { StepBanner } from './steps/step-banner';
import { StepPost } from './steps/step-post';
import { StepPostsSections } from './steps/step-posts-sections';
import { StepShopping } from './steps/step-shopping';

export const Component = () => {
  const { onClose } = useModal();
  const finishButton = (
    <Button
      variant="link"
      label="Finalizar"
      onClick={() => {
        onClose();
      }}
    />
  );

  return (
    <Stepper
      items={[
        {
          label: 'Datos básicos para la venta',
          render: (props) => <StepShopping {...props} finishButton={finishButton} />,
        },
        {
          label: 'Agregue su primer grupo de publicaciones',
          render: (props) => <StepPostsSections {...props} finishButton={finishButton} />,
        },
        {
          label: 'Agregue su primera publicación',
          render: (props) => <StepPost {...props} finishButton={finishButton} />,
        },
        {
          label: 'Banner publicitario',
          render: (props) => <StepBanner {...props} finishButton={finishButton} />,
        },
      ]}
    />
  );
};
