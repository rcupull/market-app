import { Link } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { Nullable, StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

export interface BreadCrumbleProps extends StyleProps {
  items: Array<
    Nullable<{
      label: string;
      route: string;
    }>
  >;
}
export const BreadCrumble = ({ items: itemsProp, className }: BreadCrumbleProps) => {
  const items = compact(itemsProp);

  return (
    <HtmlTextContainer className={cn('flex items-center gap-1', className)}>
      {items.map(({ label, route }, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            {!!index && <span className="font-semibold text-gray-500">{'>'}</span>}
            <Link to={route} className="text-md italic">
              {label}
            </Link>
          </div>
        );
      })}
    </HtmlTextContainer>
  );
};
