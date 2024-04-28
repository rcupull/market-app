import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdateBanner/Component';

export interface StepBannerProps extends OnboardingStepProps {}

export const StepBanner = ({ backButton, finishButton }: StepBannerProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(finishButton);
  const { business, onFetch } = useBusiness();

  return (
    <div>
      <Component
        portal={portal}
        onAfterSuccess={() => {
          nextAction();
          business && onFetch({ routeName: business.routeName });
        }}
      />
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
