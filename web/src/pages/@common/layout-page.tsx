import { BackButton } from 'components/back-button';

import SvgArrowLeftSolid from 'icons/ArrowLeftSolid';
import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutPageProps extends ChildrenProp, StyleProps {
  title?: React.ReactNode;
  backButton?: boolean;
}

export const LayoutPage = ({ children, title, backButton, className }: LayoutPageProps) => {
  return (
    <main
      className={cn('flex flex-col items-start px-2 sm:px-4 md:px-8 lg:px-16 relative', className)}
    >
      <div className="flex items-center justify-start w-full my-6">
        {backButton && <BackButton svg={() => <SvgArrowLeftSolid className="size-8" />} />}

        <h1
          className={cn('text-xl sm:text-3xl font-semibold w-full', {
            'ml-3': backButton,
          })}
        >
          {title}
        </h1>
      </div>

      {children}
    </main>
  );
};
