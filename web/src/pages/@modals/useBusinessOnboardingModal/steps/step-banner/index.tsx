import { StepProps } from 'components/stepper-v2';
import { StepperButtonContainer } from 'components/stepper-v2/StepperButtonContainer';

export interface StepBannerProps extends StepProps {}

export const StepBanner = ({ backButton, nextButton }: StepBannerProps) => {
  return (
    <div>
      StepBannerProps
      <StepperButtonContainer leftButton={backButton} rightButton={nextButton} />
    </div>
  );
};
