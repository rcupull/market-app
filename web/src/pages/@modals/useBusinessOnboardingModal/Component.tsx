import { Stepper } from 'components/stepper';

import { useUpdateChecksBusiness } from 'features/api/business/useUpdateChecksBusiness';
import { useModal } from 'features/modal/useModal';

import { StepBanner } from './steps/step-banner';
import { StepNotifications } from './steps/step-notifications';
import { StepPost } from './steps/step-post';
import { StepPostForm } from './steps/step-post-form';
import { StepPostsSections } from './steps/step-posts-sections';
import { OnboardingStepProps } from './types';

import { useBusiness } from 'pages/@hooks/useBusiness';

export const Component = () => {
  const { onClose } = useModal();
  const { business, onFetch } = useBusiness();
  const { updateChecksBusiness } = useUpdateChecksBusiness();

  const handleCheckAndClose = () => {
    if (!business) return;
    updateChecksBusiness.fetch(
      {
        routeName: business?.routeName,
        update: {
          doneOnboarding: true
        }
      },
      {
        onAfterSuccess: () => {
          onClose();
          onFetch({ routeName: business?.routeName });
        }
      }
    );
  };

  const getStepProps = (
    stepperProps: OnboardingStepProps,
    isLast: boolean
  ): OnboardingStepProps => {
    if (isLast) {
      return {
        ...stepperProps,
        nextBtnProps: {
          ...stepperProps.nextBtnProps,
          label: 'Finalizar',
          isBusy: updateChecksBusiness.status.isBusy,
          onClick: () => {
            handleCheckAndClose();
          }
        },
        centerBtnProps: {
          ...stepperProps.centerBtnProps,
          isBusy: updateChecksBusiness.status.isBusy,
          onClick: () => {
            handleCheckAndClose();
          }
        }
      };
    }

    return stepperProps;
  };

  return (
    <Stepper
      items={[
        {
          label: 'Notificaciones',
          render: (props) => <StepNotifications {...getStepProps(props, false)} />
        },
        {
          label: 'Agregue su primera sección de productos',
          render: (props) => <StepPostsSections {...getStepProps(props, false)} />
        },
        {
          label: 'Formulario de productos',
          render: (props) => <StepPostForm {...getStepProps(props, false)} />
        },
        {
          label: 'Agregue su primer producto',
          render: (props) => <StepPost {...getStepProps(props, false)} />
        },
        {
          label: 'Banner publicitario',
          render: (props) => <StepBanner {...getStepProps(props, true)} />
        }
      ]}
    />
  );
};

export default Component;
