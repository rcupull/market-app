import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

export interface StepPostsSectionsProps extends StepProps {}

export const StepPostsSections = ({ backButton, nextButton }: StepPostsSectionsProps) => {
  return (
    <div>
      StepPostsSectionsProps
      <StepperButtonContainer leftButton={backButton} rightButton={nextButton} />
    </div>
  );
};
