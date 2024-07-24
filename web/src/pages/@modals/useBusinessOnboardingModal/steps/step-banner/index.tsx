import { Button } from 'components/button';
import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdateBannerModal/Component';

export interface StepBannerProps extends OnboardingStepProps {}

export const StepBanner = ({ backBtnProps, nextBtnProps, centerBtnProps }: StepBannerProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal({ nextBtnProps });
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
      <StepperButtonContainer
        leftButton={<Button {...backBtnProps} />}
        rightButton={rightButton}
        centerButton={<Button {...centerBtnProps} />}
      />
    </div>
  );
};
