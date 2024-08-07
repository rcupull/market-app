import { Button } from 'components/button';
import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { ComponentProduct as Component } from 'pages/@modals/useBusinessNewUpdateSectionModal/ComponentProduct';

export interface StepPostsSectionsProps extends OnboardingStepProps {}

export const StepPostsSections = ({
  backBtnProps,
  nextBtnProps,
  centerBtnProps
}: StepPostsSectionsProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal({ nextBtnProps });
  const { onFetch, business, getSections } = useBusiness();

  const firstSection = getSections()[0];
  return (
    <div>
      <Component
        portal={portal}
        /**
         * edit the fist section if it exists already
         */
        section={firstSection}
        onAfterSuccess={() => {
          business && onFetch({ routeName: business.routeName });
          nextAction();
        }}
        className="max-h-[70vh] overflow-y-auto"
      />
      <StepperButtonContainer
        leftButton={<Button {...backBtnProps} />}
        rightButton={rightButton}
        centerButton={<Button {...centerBtnProps} />}
      />
    </div>
  );
};
