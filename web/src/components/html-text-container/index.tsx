import { cn } from 'utils/general';

export interface HtmlTextContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export const HtmlTextContainer = ({ className, ...props }: HtmlTextContainerProps) => {
  return <div className={cn('no-preflight', className)} {...props} />;
};
