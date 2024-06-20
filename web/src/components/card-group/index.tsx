import { PostCardLayout } from 'types/business';
import { cn } from 'utils/general';
export interface CardGroupProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  layout?: PostCardLayout;
}

export const CardGroup = ({ className, children, title, layout }: CardGroupProps) => {
  const postSize = layout?.size;

  return (
    <div data-id="CardGroup" className={cn(className)}>
      {title && <h2 className="not-sr-only">{title}</h2>}

      <div
        className={cn('grid  place-items-center', {
          'grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-8 gap-2 p-1':
            postSize === 'small',
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-8 p-1':
            postSize === 'medium',
          'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 p-4':
            postSize === 'long',
        })}
      >
        {children}
      </div>
    </div>
  );
};
