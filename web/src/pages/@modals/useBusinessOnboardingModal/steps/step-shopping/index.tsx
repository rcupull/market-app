import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdateTelegramBot/Component';

export interface StepShoppingProps extends OnboardingStepProps {}

export const StepShopping = ({ nextButton }: StepShoppingProps) => {
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
