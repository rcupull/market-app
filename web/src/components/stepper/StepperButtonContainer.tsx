import { cn } from 'utils/general';

export interface StepperButtonContainerProps {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  centerButton?: React.ReactNode;
}

export const StepperButtonContainer = ({
  leftButton,
  rightButton,
  centerButton
}: StepperButtonContainerProps) => {
  return (
    <div
      className={cn('flex items-center w-full mt-6', {
        'justify-between': leftButton && rightButton,
        'justify-end': rightButton && !leftButton,
        'justify-center': !leftButton && !rightButton
      })}
    >
      {leftButton}
      <div className="flex items-center gap-4">
        {centerButton}
        {rightButton}
      </div>
    </div>
  );
};
