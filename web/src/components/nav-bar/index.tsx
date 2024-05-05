import { Link } from 'react-router-dom';

import { useRouter } from 'hooks/useRouter';

import { Nullable, StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

interface Item {
  name: string;
  href: string;
  className?: string;
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
        'w-full px-8 bg-white flex shadow-lg items-center justify-center h-16 gap-6',
        className,
      )}
    >
      {preContent}

      <div className="space-x-4 hidden sm:flex flex-1">
        {compact(items).map((item) => {
          const current = pathname === item?.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                current
                  ? 'bg-gray-300 text-gray-600'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-600',
                'rounded-md px-3 py-2 text-sm font-medium text-nowrap',
                item.className,
              )}
              aria-current={current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {postContent && <div className="flex items-center gap-0">{postContent}</div>}
    </div>
  );
};
