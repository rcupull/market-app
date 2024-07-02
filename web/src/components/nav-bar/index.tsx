import { Link } from 'react-router-dom';

import { Menu, MenuProps } from 'components/menu';

import { useRouter } from 'hooks/useRouter';

import { Nullable, StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

interface Item {
  name: string;
  href?: string;
  className?: string;
  menuProps?: Pick<MenuProps, 'items'>;
}

export interface NavbarProps extends StyleProps {
  preContent?: React.ReactNode;
  items: Array<Nullable<Item>>;
  postContent?: React.ReactNode;
}

export const NavBar = ({ items, preContent, postContent, className }: NavbarProps) => {
  const { pathname } = useRouter();

  return (
    <div
      data-id="NavBar"
      className={cn(
        'w-full px-2 sm:px-8 bg-white flex shadow-lg items-center justify-center h-16 gap-6',
        className
      )}
    >
      {preContent}

      <div className="space-x-4 hidden lg:flex flex-1">
        {compact(items).map(({ href, name, menuProps, className }) => {
          const current = pathname === href;

          if (menuProps) {
            return (
              <Menu
                key={name}
                {...menuProps}
                buttonElement={
                  <div
                    className={cn(
                      current
                        ? 'bg-gray-300 text-gray-600'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-600',
                      'rounded-md px-3 py-2 text-sm font-medium text-nowrap',
                      className
                    )}
                  >
                    {name}
                  </div>
                }
              />
            );
          }

          if (href) {
            return (
              <Link
                key={name}
                to={href}
                className={cn(
                  current
                    ? 'bg-gray-300 text-gray-600'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-600',
                  'rounded-md px-3 py-2 text-sm font-medium text-nowrap',
                  className
                )}
                aria-current={current ? 'page' : undefined}
              >
                {name}
              </Link>
            );
          }

          return <>unknown</>;
        })}
      </div>

      {postContent && <div className="flex items-center gap-0 ml-auto">{postContent}</div>}
    </div>
  );
};
