import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface RowActionsContainerProps extends ChildrenProp, StyleProps {}

export const RowActionsContainer = ({ children, className }: RowActionsContainerProps) => {
  return (
    <div className={className}>
      <div className={cn('flex items-center flex-wrap sm:flex-nowrap')}>{children}</div>
    </div>
  );
};
