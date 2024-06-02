import { Button } from 'components/button';
import { Stepper } from 'components/stepper';

import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { StepBanner } from './steps/step-banner';
import { StepPost } from './steps/step-post';
import { StepPostsSections } from './steps/step-posts-sections';
import { StepShopping } from './steps/step-shopping';
import { BusinessOnboardingSteps } from './types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { getOneBusinessRoute } from 'utils/business';
import { compact } from 'utils/general';

export interface ComponentProps {
  steps?: Array<BusinessOnboardingSteps>;
}

export const Component = ({
  steps = ['banner', 'products', 'shopping', 'section'],
}: ComponentProps) => {
  const { onClose } = useModal();
  const { pushRoute } = useRouter();
  const { business } = useBusiness();

  const finishButton = (
    <Button
      variant="link"
      label="Ver la página del negocio"
      onClick={() => {
        onClose();
        business && pushRoute(getOneBusinessRoute({ routeName: business.routeName }));
      }}
    />
  );

  const compactSteps: Array<BusinessOnboardingSteps> = compact([
    steps.includes('shopping') && 'shopping',
    steps.includes('section') && 'section',
    steps.includes('products') && 'products',
    steps.includes('banner') && 'banner',
  ]);

  const lastStep = compactSteps[compactSteps.length - 1];

  return (
    <Stepper
      items={[
        compactSteps.includes('shopping') && {
          label: 'Datos básicos para la venta',
          render: (props) => (
            <StepShopping
              {...props}
              {...(lastStep === 'shopping' ? { nextButton: finishButton } : {})}
            />
          ),
        },
        compactSteps.includes('section') && {
          label: 'Agregue su primera sección de productos',
          render: (props) => (
            <StepPostsSections
              {...props}
              {...(lastStep === 'section' ? { nextButton: finishButton } : {})}
            />
          ),
        },
        compactSteps.includes('products') && {
          label: 'Agregue su primer producto',
          render: (props) => (
            <StepPost
              {...props}
              {...(lastStep === 'products' ? { nextButton: finishButton } : {})}
            />
          ),
        },
        compactSteps.includes('banner') && {
          label: 'Banner publicitario',
          render: (props) => (
            <StepBanner
              {...props}
              {...(lastStep === 'banner' ? { nextButton: finishButton } : {})}
            />
          ),
        },
      ]}
    />
  );
};

export default Component;
