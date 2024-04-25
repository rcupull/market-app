import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ZoomUpContainerProps extends StyleProps {
  children?: React.ReactNode;
}

export const ZoomUpContainer = ({ className, children }: ZoomUpContainerProps) => {
  return (
    <div data-id="ZoomUpContainer" className="overflow-hidden">
      <div className={cn('transition-transform duration-200 hover:scale-125', className)}>
        {children}
      </div>
    </div>
  );
};
