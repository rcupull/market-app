import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutPageProps extends ChildrenProp, StyleProps {
  title?: React.ReactNode;
  topRightHeader?: React.ReactNode;
}

export const LayoutPage = ({ children, title, className, topRightHeader }: LayoutPageProps) => {
  return (
    <main
      className={cn('flex flex-col items-start px-2 sm:px-4 md:px-8 lg:px-16 relative', className)}
    >
      <div className="flex items-center justify-start w-full my-6">
        <h1 className={cn('text-xl sm:text-3xl font-semibold w-full')}>{title}</h1>

        <div className="ml-auto">{topRightHeader}</div>
      </div>

      {children}
    </main>
  );
};
