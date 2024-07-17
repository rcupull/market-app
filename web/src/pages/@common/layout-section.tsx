import { BackButton } from 'components/back-button';

import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionProps extends ChildrenProp, StyleProps {
  backButton?: boolean;
  title?: React.ReactNode;
  topRightHeader?: React.ReactNode;
}

export const LayoutSection = ({
  backButton,
  title,
  children,
  topRightHeader,
  className,
}: LayoutSectionProps): JSX.Element => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {backButton && <BackButton />}

        <div className="flex w-full items-end sm:items-center justify-between mt-2">
          {title && (
            <h1
              className={cn('text-xl sm:text-2xl font-semibold my-1', {
                'ml-3': backButton,
              })}
            >
              {title}
            </h1>
          )}

          <div className="ml-auto">{topRightHeader}</div>
        </div>
      </div>

      <div className="m-2">{children}</div>
    </div>
  );
};
