import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdatePostCategories/Component';

export interface StepPostcategoriesProps extends StepProps {}

export const StepPostcategories = ({ nextButton }: StepPostcategoriesProps) => {
  const { nextAction, portal } = useNextButtonPortal(nextButton);

  return (
    <div>
      <Component portal={portal} onAfterSuccess={nextAction} />
      <StepperButtonContainer rightButton={<div ref={portal.ref} />} />
    </div>
  );
};
