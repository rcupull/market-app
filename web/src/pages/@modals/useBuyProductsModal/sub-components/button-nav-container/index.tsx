import { cn } from 'utils/general';

export interface ButtonNavContainerProps {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export const ButtonNavContainer = ({ leftButton, rightButton }: ButtonNavContainerProps) => {
  return (
    <div
      className={cn('flex items-center w-full mt-6', {
        'justify-between': leftButton && rightButton,
        'justify-end': rightButton && !leftButton,
        'justify-center': !leftButton && !rightButton
      })}
    >
      {leftButton}
      {rightButton}
    </div>
  );
};
