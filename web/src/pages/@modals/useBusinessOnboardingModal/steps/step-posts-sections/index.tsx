import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessNewUpdateSection/Component';

export interface StepPostsSectionsProps extends StepProps {}

export const StepPostsSections = ({ backButton, nextButton }: StepPostsSectionsProps) => {
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
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
