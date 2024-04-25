import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionProps extends ChildrenProp {
  backButton?: boolean;
  title?: string;
  topRightHeader?: React.ReactNode;
}

export const LayoutSection = ({
  backButton,
  title,
  children,
  topRightHeader,
}: LayoutSectionProps): JSX.Element => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {backButton && <BackButton />}

        <div className="flex w-full items-end sm:items-center justify-between">
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

      {children}
    </div>
  );
};
