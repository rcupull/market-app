import { SideBar as SideBarBase } from 'components/side-bar';

import { useGetAgendaTokenAdmin } from 'features/api/admin/useGetAgendaTokenAdmin';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { AddNewBusinessButton } from './AddNewBusinessButton';
import { SideBarUserHeader } from './SideBarUserHeader';

import SvgCalendar from 'icons/Calendar';
import SvgCogSolid from 'icons/CogSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import SvgStoreSolid from 'icons/StoreSolid';
import SvgTrainSolid from 'icons/TrainSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import { StyleProps } from 'types/general';
import { getEndpoint } from 'utils/api';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const allUserBusiness = useAllUserBusiness();
  const { isAdmin, isAuthenticated, isUser, isBasicUser, getHasSomeAccess } = useAuth(); //
  const { getAgendaTokenAdmin } = useGetAgendaTokenAdmin();

  const business = allUserBusiness.data || [];

  if (!isAuthenticated || isBasicUser) {
    return <></>;
  }

  return (
    <SideBarBase
      className={className}
      items={[
        isAuthenticated && {
          content: <SideBarUserHeader />,
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
          isAdmin &&
          getHasSomeAccess('user__read') && {
            // ADMIN
            label: 'Usuarios',
            href: '/admin/users',
            svg: SvgUsersSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin &&
          getHasSomeAccess('shopping__read') && {
            // ADMIN
            label: 'Órdenes de compra',
            href: '/admin/shopping',
            svg: SvgShoppingCartSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin &&
          getHasSomeAccess('business__read') && {
            // ADMIN
            label: 'Negocios',
            href: '/admin/business',
            svg: SvgStoreSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin &&
          getHasSomeAccess('bills__read') && {
            // ADMIN
            label: 'Facturas',
            href: '/admin/bills',
            svg: SvgMoneyBillAltSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin &&
          getHasSomeAccess('agenda__full') && {
            // ADMIN
            label: 'Agenda',
            svg: SvgCalendar,
            onClick: () => {
              getAgendaTokenAdmin.fetch(undefined, {
                onAfterSuccess: (response) => {
                  const { agendaToken } = response;

                  window.open(
                    getEndpoint({
                      path: '/admin/agenda/web/:agendaToken',
                      urlParams: { agendaToken },
                    })
                  );
                },
              });
            },
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Configuración',
            href: '/admin/settings',
            svg: SvgCogSolid,
            className: 'pl-10',
          },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Nlp',
            href: '/admin/nlp',
            svg: SvgTrainSolid,
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
