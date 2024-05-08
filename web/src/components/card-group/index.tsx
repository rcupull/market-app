import { cn } from 'utils/general';
export interface CardGroupProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export const CardGroup = ({ className, children, title }: CardGroupProps) => {
  return (
    <div data-id="CardGroup" className={cn(className)}>
      {title && <h2 className="not-sr-only">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {children}
      </div>
    </div>
  );
};
