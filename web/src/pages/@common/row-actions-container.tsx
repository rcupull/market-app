import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface RowActionsContainerProps extends ChildrenProp, StyleProps {}

export const RowActionsContainer = ({ children, className }: RowActionsContainerProps) => {
  return (
    <div className={className}>
      <div className={cn('grid grid-cols-3 w-28')}>{children}</div>
    </div>
  );
};
