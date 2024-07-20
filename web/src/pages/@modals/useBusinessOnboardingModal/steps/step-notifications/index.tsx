import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdateNotificationsModal/Component';

export interface StepNotificationsProps extends OnboardingStepProps {}

export const StepNotifications = ({ nextButton }: StepNotificationsProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(nextButton);
  const { onFetch, business } = useBusiness();

  return (
    <div>
      <Component
        portal={portal}
        onAfterSuccess={() => {
          business && onFetch({ routeName: business.routeName });
          nextAction();
        }}
      />
      <StepperButtonContainer rightButton={rightButton} />
    </div>
  );
};
