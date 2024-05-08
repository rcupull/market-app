import { cn } from 'utils/general';

export interface StepperButtonContainerProps {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export const StepperButtonContainer = ({
  leftButton,
  rightButton,
}: StepperButtonContainerProps) => {
  return (
    <div
      className={cn('flex items-center w-full mt-6', {
        'justify-between': leftButton && rightButton,
        'justify-end': rightButton && !leftButton,
        'justify-center': !leftButton && !rightButton,
      })}
    >
      {leftButton}
      {rightButton}
    </div>
  );
};
