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

      <div className="flex flex-wrap justify-around gap-4">{children}</div>
    </div>
  );
};
