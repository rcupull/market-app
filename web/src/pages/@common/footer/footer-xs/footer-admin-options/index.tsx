import { Menu, MenuItem } from 'components/menu';

import { useAdminBDScript } from 'features/api/admin/useAdminBDScript';
import { useGetAgendaTokenAdmin } from 'features/api/admin/useGetAgendaTokenAdmin';
import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { FooterButton } from '../footer-button';

import SvgUserCogSolid from 'icons/UserCogSolid';
import { Nullable } from 'types/general';
import { getEndpoint } from 'utils/api';
import { BusinessTab, getBusinessTabLabel } from 'utils/view';

export interface FooterAdminOptionsProps {
  active?: boolean;
}

export const FooterAdminOptions = ({ active }: FooterAdminOptionsProps) => {
  const { pushRoute, query, isOneBusinessPage } = useRouter();
  const { getHasSomeAccess } = useAuth();
  const { getAgendaTokenAdmin } = useGetAgendaTokenAdmin();
  const { adminBDScript } = useAdminBDScript();

  const getSubLabel = () => {
    if (!active) return null;

    if (isOneBusinessPage) {
      return `Página`;
    }

    if (query.businessTab) {
      return getBusinessTabLabel(query.businessTab as BusinessTab);
    }

    return null;
  };

  const getAdminItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
      getHasSomeAccess('user__read') && {
        label: 'Usuarios',
        onClick: () => pushRoute('/admin/users'),
      },
      {
        label: 'Órdenes de compra',
        onClick: () => pushRoute('/admin/shopping'),
      },
      {
        label: 'Negocios',
        onClick: () => pushRoute('/admin/business'),
      },
      getHasSomeAccess('bills__read') && {
        label: 'Facturas',
        onClick: () => pushRoute('/admin/bills'),
      },
      getHasSomeAccess('agenda__full') && {
        label: 'Agenda',
        onClick: () => {
          getAgendaTokenAdmin.fetch(undefined, {
            onAfterSuccess: (response) => {
              const { agendaToken } = response;

              window.open(
                getEndpoint({
                  path: '/admin/agenda/web/:agendaToken',
                  urlParams: { agendaToken },
                }),
              );
            },
          });
        },
      },
      {
        label: 'Configuración',
        onClick: () => pushRoute('/admin/settings'),
      },
      {
        label: 'Nlp',
        onClick: () => pushRoute('/admin/nlp'),
      },
      getHasSomeAccess('full') && {
        label: 'Run BD script',
        onClick: () => adminBDScript.fetch(),
      },
    ];

    return out;
  };

  const subLabel = getSubLabel();
  return (
    <Menu
      buttonElement={
        <FooterButton
          label={
            <div className="flex flex-col items-center">
              Admin
              {subLabel && <span className="text-xs">({subLabel})</span>}
            </div>
          }
          svg={SvgUserCogSolid}
          active={active}
        />
      }
      items={getAdminItems()}
    />
  );
};
