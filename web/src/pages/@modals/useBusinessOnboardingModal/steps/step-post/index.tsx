import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessNewUpdatePost/Component';

export interface StepPostProps extends OnboardingStepProps {}

export const StepPost = ({ backButton, nextButton }: StepPostProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(nextButton);

  return (
    <div>
      <Component
        portal={portal}
        postType='product'
        onAfterSuccess={() => {
          nextAction();
        }}
        className="max-h-[70vh] overflow-y-auto"
      />
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
