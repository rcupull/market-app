import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessUpdatePostCategories/Component';

export interface StepPostcategoriesProps extends StepProps {}

export const StepPostcategories = ({ nextButton }: StepPostcategoriesProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(nextButton);
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
      <StepperButtonContainer rightButton={rightButton} />
    </div>
  );
};
