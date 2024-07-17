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
  className,
}: LayoutSectionProps): JSX.Element => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex w-full items-end sm:items-center justify-between mt-2">
          {title && <h1 className={cn('text-xl sm:text-2xl font-semibold my-1')}>{title}</h1>}

          <div className="ml-auto">{topRightHeader}</div>
        </div>
      </div>

      <div className="m-2">{children}</div>
    </div>
  );
};
