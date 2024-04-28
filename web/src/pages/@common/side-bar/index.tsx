import {
  BookmarkIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { IconShowHide } from 'components/icon-show-hide';
import { SideBar as SideBarBase } from 'components/side-bar';

import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { AddNewBusinessButton } from './AddNewBusinessButton';
import { SideBarUserHeader } from './SideBarUserHeader';

import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const allUserBusiness = useAllUserBusiness();
  const { isBusinessPage, isDashboardPage, params } = useRouter();
  const { routeName } = params;
  const { isAdmin, isAuthenticated, isUser } = useAuth();

  const isDashboardOrAdminPage = isDashboardPage || isAdmin;

  const business = allUserBusiness.data || [];

  return (
    <SideBarBase
      className={className}
      items={[
        isAuthenticated && {
          content: <SideBarUserHeader />,
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        isDashboardOrAdminPage && {
          divider: true,
        },
        isBusinessPage && { label: 'Publicaciones', href: `/${routeName}`, svg: HomeIcon },
        !isBusinessPage && { label: 'Inicio', href: '/', svg: HomeIcon, className: 'sm:hidden' },
        !isBusinessPage && {
          label: 'Precio',
          href: '/price',
          svg: CurrencyDollarIcon,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: '¿Que es Asere Market?',
          href: '/about-us',
          svg: UserCircleIcon,
          className: 'sm:hidden',
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
          divider: true,
          className: 'sm:hidden',
        },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Admin',
            href: '/admin',
            svg: Cog8ToothIcon,
          },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Usuarios',
            href: '/admin/users',
            svg: UserGroupIcon,
            className: 'pl-10',
          },
        isAuthenticated &&
          isUser && {
            // BUSINESS
            label: 'Mis negocios',
            href: '/dashboard/business',
            svg: BookmarkIcon,
            endElement: <AddNewBusinessButton className="ml-auto" />
          },
        ...business.map(({ name, routeName, hidden }) => {
          // BUSINESS

          return (
            isAuthenticated &&
            isUser && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: <IconShowHide className="h-4 ml-auto" hidden={hidden} />,
              className: 'pl-10',
            }
          );
        }),
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        isAuthenticated &&
          isUser && {
            divider: true,
          },
      ]}
    />
  );
};
