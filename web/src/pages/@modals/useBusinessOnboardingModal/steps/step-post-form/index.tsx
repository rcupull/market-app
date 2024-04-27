import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdatePostForm/Component';

export interface StepPostsSectionsProps extends StepProps {}

export const StepPostForm = ({ backButton, nextButton }: StepPostsSectionsProps) => {
  const { nextAction, portal } = useNextButtonPortal(nextButton);
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
      <StepperButtonContainer leftButton={backButton} rightButton={<div ref={portal.ref} />} />
    </div>
  );
};