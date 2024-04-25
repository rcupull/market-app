import { ChildrenProp, StyleProps } from 'types/general';

export interface StepProps extends ChildrenProp, StyleProps {
  text: string;
}

export const Step = ({ children, text, className }: StepProps) => {
  return (
    <div className={className}>
      <div className="text-lg">{text}</div>
      <div className="flex flex-col items-center gap-8 mt-8">{children}</div>,
    </div>
  );
};
