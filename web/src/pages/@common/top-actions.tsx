import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TopActionsProps extends ChildrenProp, StyleProps {}

export const TopActions = ({ children, className }: TopActionsProps) => {
  return <div className={cn('flex w-full px-1 py-3 gap-3', className)}>{children}</div>;
};
