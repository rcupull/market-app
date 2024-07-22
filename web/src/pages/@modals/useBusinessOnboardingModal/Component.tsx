import { Stepper } from 'components/stepper';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { StepBanner } from './steps/step-banner';
import { StepNotifications } from './steps/step-notifications';
import { StepPost } from './steps/step-post';
import { StepPostForm } from './steps/step-post-form';
import { StepPostsSections } from './steps/step-posts-sections';
import { BusinessOnboardingSteps, OnboardingStepProps } from './types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { getOneBusinessRoute } from 'utils/business';
import { compact } from 'utils/general';
export interface ComponentProps {
  steps?: Array<BusinessOnboardingSteps>;
}

export const Component = ({
  steps = ['banner', 'products', 'notifications', 'section', 'productsForm'],
}: ComponentProps) => {
  const { onClose } = useModal();
  const { pushRoute } = useRouter();
  const { business } = useBusiness();
  const { updateOneBusiness } = useUpdateOneBusiness();


  const compactSteps: Array<BusinessOnboardingSteps> = compact([
    steps.includes('notifications') && 'notifications',
    steps.includes('section') && 'section',
    steps.includes('productsForm') && 'productsForm',
    steps.includes('products') && 'products',
    steps.includes('banner') && 'banner',
  ]);

  const lastStep = compactSteps[compactSteps.length - 1];

  const getStepProps = (
    stepperProps: OnboardingStepProps,
    step: BusinessOnboardingSteps,
  ): OnboardingStepProps => {
    if (lastStep === step) {
      return {
        ...stepperProps,
        nextBtnProps: {
          ...stepperProps.nextBtnProps,
          label: 'Ver la página del negocio',
          isBusy: updateOneBusiness.status.isBusy,
          onClick: () => {
            if (!business) return;
            updateOneBusiness.fetch(
              {
                routeName: business?.routeName,
                update: {
                  doneOnboarding: true,
                },
              },
              {
                onAfterSuccess: () => {
                  onClose();
                  pushRoute(getOneBusinessRoute({ routeName: business.routeName }));
                },
              },
            );
          },
        },
        centerBtnProps: { className: 'hidden' },
      };
    }

    return stepperProps;
  };

  return (
    <Stepper
      items={[
        compactSteps.includes('notifications') && {
          label: 'Notificaciones',
          render: (props) => <StepNotifications {...getStepProps(props, 'notifications')} />,
        },
        compactSteps.includes('section') && {
          label: 'Agregue su primera sección de productos',
          render: (props) => <StepPostsSections {...getStepProps(props, 'section')} />,
        },
        compactSteps.includes('productsForm') && {
          label: 'Formulario de productos',
          render: (props) => <StepPostForm {...getStepProps(props, 'productsForm')} />,
        },
        compactSteps.includes('products') && {
          label: 'Agregue su primer producto',
          render: (props) => <StepPost {...getStepProps(props, 'products')} />,
        },
        compactSteps.includes('banner') && {
          label: 'Banner publicitario',
          render: (props) => <StepBanner {...getStepProps(props, 'banner')} />,
        },
      ]}
    />
  );
};

export default Component;
