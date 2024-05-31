import { Button } from 'components/button';
import { Stepper } from 'components/stepper';

import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { StepBanner } from './steps/step-banner';
import { StepPost } from './steps/step-post';
import { StepPostsSections } from './steps/step-posts-sections';
import { StepShopping } from './steps/step-shopping';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { getOneBusinessRoute } from 'utils/business';

export const Component = () => {
  const { onClose } = useModal();
  const { pushRoute } = useRouter();
  const { business } = useBusiness();

  const finishButton = (
    <Button
      variant="link"
      label="Ir a la página del negocio"
      onClick={() => {
        onClose();
        business && pushRoute(getOneBusinessRoute({ routeName: business.routeName }));
      }}
    />
  );

  return (
    <Stepper
      //Enable stepper navigation only in development
      disabledStepNavigation={!DEVELOPMENT}
      items={[
        {
          label: 'Datos básicos para la venta',
          render: (props) => <StepShopping {...props} finishButton={finishButton} />,
        },
        {
          label: 'Agregue su primera sección de productos',
          render: (props) => <StepPostsSections {...props} finishButton={finishButton} />,
        },
        {
          label: 'Agregue su primer producto',
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

export default Component;
