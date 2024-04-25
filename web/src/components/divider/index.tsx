import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface DividerProps extends StyleProps {}

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn('w-full mt-8 mb-4 border-t-2 border-gray-300', className)} />;
};
