import { Button } from 'components/button';
import { Stepper } from 'components/stepper-v2';

import { useModal } from 'features/modal/useModal';

import { StepBanner } from './steps/step-banner';
import { StepPostcategories } from './steps/step-post-categories';
import { StepPostForm } from './steps/step-post-form';
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
          label: '¿Como pretende vender sus productos?',
          render: (props) => <StepShopping {...props} finishButton={finishButton} />,
        },
        {
          label: 'Categorías de las publicaciones',
          render: (props) => <StepPostcategories {...props} finishButton={finishButton} />,
        },
        {
          label: 'Formulario de publicación',
          render: (props) => <StepPostForm {...props} finishButton={finishButton} />,
        },
        {
          label: 'Grupos de publicaciones',
          render: (props) => <StepPostsSections {...props} finishButton={finishButton} />,
        },
        {
          label: 'Banner publicitario',
          render: (props) => <StepBanner {...props} finishButton={finishButton} />,
        },
      ]}
    />
  );
};
