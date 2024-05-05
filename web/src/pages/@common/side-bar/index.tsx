import { SideBar as SideBarBase } from 'components/side-bar';

import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { AddNewBusinessButton } from './AddNewBusinessButton';
import { SideBarUserHeader } from './SideBarUserHeader';

import SvgCogSolid from 'icons/CogSolid';
import SvgDollarSignSolid from 'icons/DollarSignSolid';
import SvgHomeSolid from 'icons/HomeSolid';
import SvgStoreSolid from 'icons/StoreSolid';
import SvgUsersSolid from 'icons/UsersSolid';
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
        isBusinessPage && { label: 'Publicaciones', href: `/${routeName}`, svg: SvgHomeSolid },
        !isBusinessPage && {
          label: 'Inicio',
          href: '/',
          svg: SvgHomeSolid,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: 'Precio',
          href: '/price',
          svg: SvgDollarSignSolid,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: '¿Que es Asere Market?',
          href: '/about-us',
          svg: SvgUsersSolid,
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
            svg: SvgCogSolid,
          },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Usuarios',
            href: '/admin/users',
            svg: SvgUsersSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isUser && {
            // BUSINESS
            label: 'Mis negocios',
            href: '/dashboard/business',
            svg: SvgStoreSolid,
            endElement: <AddNewBusinessButton className="ml-auto" />,
          },
        ...business.map(({ name, routeName, hidden }) => {
          // BUSINESS

          return (
            isAuthenticated &&
            isUser && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: hidden && <span className="text-gray-500 text-sm">(Oculto)</span>,
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
