import { useAuth } from 'features/api-slices/useAuth';

import { FooterAdminOptions } from './footer-admin-options';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FooterXsProps extends StyleProps {}

export const FooterXs = ({ className }: FooterXsProps) => {
  const { user, getIsAdmin, isAuthenticated } = useAuth();

  return (
    <footer className={cn('shadow-lg -scale-y-100 bg-white px-2 py-1', className)}>
      <div
        className={cn('flex -scale-y-100  gap-3 overflow-x-auto h-[4.3rem]', {
          'items-start justify-start': isAuthenticated,
          'items-center justify-between': !isAuthenticated
        })}
      >
        {getIsAdmin(user) && <FooterAdminOptions />}
      </div>
    </footer>
  );
};
