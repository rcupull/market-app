import { StepProps } from 'components/stepper';

export interface OnboardingStepProps extends StepProps {}

export type BusinessOnboardingSteps =
  | 'notifications'
  | 'section'
  | 'products'
  | 'productsForm'
  | 'banner';
