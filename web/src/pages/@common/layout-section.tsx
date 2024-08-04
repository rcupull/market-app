import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionProps extends ChildrenProp, StyleProps {
  title?: React.ReactNode;
  topRightHeader?: React.ReactNode;
}

export const LayoutSection = ({
  title,
  children,
  topRightHeader,
  className
}: LayoutSectionProps): JSX.Element => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex w-full items-end sm:items-center justify-between mt-1 sm:mt-2">
          {title && <h1 className={cn('text-md sm:text-2xl font-semibold my-1')}>{title}</h1>}

          <div className="ml-auto">{topRightHeader}</div>
        </div>
      </div>

      <div className="m-0 sm:m-2">{children}</div>
    </div>
  );
};
