import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionSubProps extends ChildrenProp, StyleProps {
  title?: string;
  isBusy?: boolean;
}

export const LayoutPageSection = ({
  title,
  children,
  className,
  isBusy,
}: LayoutSectionSubProps): JSX.Element => {
  return (
    <div className={cn('mt-4 w-full relative', className)}>
      {title && <h2 className="text-xl mt-3 mb-2">{title}</h2>}

      {children}

      {isBusy && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerEllipsis />
        </div>
      )}
    </div>
  );
};
