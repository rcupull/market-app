import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutPageProps extends ChildrenProp {
  title?: React.ReactNode;
  backButton?: boolean;
}

export const LayoutPage = ({ children, title, backButton }: LayoutPageProps) => {
  return (
    <main className="flex flex-col items-center px-0 sm:px-16 md:px-32 relative">
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
