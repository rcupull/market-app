import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdatePostForm/Component';

export interface StepPostFormProps extends OnboardingStepProps {}

export const StepPostForm = ({ backButton, nextButton }: StepPostFormProps) => {
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
        className="max-h-[70vh] overflow-y-auto"
      />
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
