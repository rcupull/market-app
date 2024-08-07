import { Menu, MenuItem } from 'components/menu';

import { useAdminBDScript } from 'features/api/admin/useAdminBDScript';
import { useGetAgendaTokenAdmin } from 'features/api/admin/useGetAgendaTokenAdmin';
import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { FooterButton } from '../footer-button';

import SvgUserCogSolid from 'icons/UserCogSolid';
import { Nullable } from 'types/general';
import { getEndpoint } from 'utils/api';
import { AdminTab, getAdminTabLabel } from 'utils/view';

export interface FooterAdminOptionsProps {
  active?: boolean;
}

export const FooterAdminOptions = ({ active }: FooterAdminOptionsProps) => {
  const { pushRoute, query } = useRouter();
  const { getHasSomeAccess } = useAuth();
  const { getAgendaTokenAdmin } = useGetAgendaTokenAdmin();
  const { adminBDScript } = useAdminBDScript();

  const getSubLabel = () => {
    if (!active) return null;

    if (query.adminTab) {
      return getAdminTabLabel(query.adminTab as AdminTab);
    }

    return null;
  };

  const getAdminItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
      getHasSomeAccess('user__read') && {
        label: 'Usuarios',
        onClick: () => {
          const adminTab: AdminTab = 'users';
          pushRoute('/admin', { adminTab });
        }
      },
      getHasSomeAccess('shopping__read') && {
        label: 'Órdenes de compra',
        onClick: () => {
          const adminTab: AdminTab = 'shopping';
          pushRoute('/admin', { adminTab });
        }
      },
      {
        label: 'Negocios',
        onClick: () => {
          const adminTab: AdminTab = 'business';
          pushRoute('/admin', { adminTab });
        }
      },
      getHasSomeAccess('bills__read') && {
        label: 'Facturas',
        onClick: () => {
          const adminTab: AdminTab = 'billing';
          pushRoute('/admin', { adminTab });
        }
      },
      {
        label: 'Configuración',
        onClick: () => {
          const adminTab: AdminTab = 'settings';
          pushRoute('/admin', { adminTab });
        }
      },
      getHasSomeAccess('full') && {
        label: 'Nlp',
        onClick: () => {
          const adminTab: AdminTab = 'nlp';
          pushRoute('/admin', { adminTab });
        }
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
                  urlParams: { agendaToken }
                })
              );
            }
          });
        },
        divider: true
      },
      getHasSomeAccess('full') && {
        label: 'Run BD script',
        onClick: () => adminBDScript.fetch(),
        className: '!bg-red-200'
      }
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
