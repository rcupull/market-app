import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Divider } from 'components/divider';

import { useRouter } from 'hooks/useRouter';

import { Nullable, StyleProps } from 'types/general';
import { cn } from 'utils/general';

interface SideBarItem extends StyleProps {
  divider?: boolean;
  content?: React.ReactNode;
  label?: string;
  href?: string;
  svg?: React.FC<{ className?: string }>;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  endElement?: React.ReactNode;
}

export interface SideBarProps extends StyleProps {
  items: Array<Nullable<SideBarItem>>;
  collapse?: boolean;
}

export const SideBar = ({ className, items, collapse }: SideBarProps) => {
  const { pathname } = useRouter();

  return (
    <div
      data-id="SideBar"
      className={cn(
        'flex flex-col items-center w-full h-full overflow-hidden text-gray-700 bg-gray-100 pb-3  border-r-2 border-gray-300',
        className,
      )}
    >
      {items?.map((item, index) => {
        if (!item) return null;

        const { svg: Svg, href, label, className, endElement, onClick, divider, content } = item;
        const isActive = pathname === href;

        if (divider) {
          return <Divider key={index} className={cn('!mt-3 !mb-1', className)} />;
        }

        if (content) {
          return <Fragment key={index}>{content}</Fragment>;
        }

        return (
          <Fragment key={index}>
            {href ? (
              <Link
                className={cn(
                  'flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 hover:text-gray-800 overflow-hidden',
                  { ['bg-gray-200 text-gray-900']: isActive },
                  className,
                )}
                to={href}
              >
                {Svg && <Svg className="w-6 h-6 stroke-current" />}
                {!collapse && <span className="ml-2 text-sm font-medium">{label}</span>}

                {endElement}
              </Link>
            ) : (
              <div
                className={cn(
                  'flex items-center cursor-pointer w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 overflow-hidden',
                  { ['bg-gray-600 text-gray-200']: isActive },
                  className,
                )}
                onClick={onClick}
              >
                {Svg && <Svg className="w-6 h-6 stroke-current" />}

                {!collapse && <span className="ml-2 text-sm font-medium">{label}</span>}

                {endElement}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
