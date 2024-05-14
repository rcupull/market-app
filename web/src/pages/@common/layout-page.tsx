import { BackButton } from 'components/back-button';

import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutPageProps extends ChildrenProp, StyleProps {
  title?: React.ReactNode;
  backButton?: boolean;
}

export const LayoutPage = ({ children, title, backButton, className }: LayoutPageProps) => {
  return (
    <main className={cn("flex flex-col items-start px-0 sm:px-16 md:px-32 relative", className)}>
      <div className="flex items-center justify-start w-full my-6">
        {backButton && <BackButton />}

        <h1
          className={cn('text-3xl font-semibold w-full', {
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
