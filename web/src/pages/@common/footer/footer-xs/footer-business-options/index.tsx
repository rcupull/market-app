import { Menu } from 'components/menu';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { useRouter } from 'hooks/useRouter';

import { FooterButton } from '../footer-button';

import SvgCogSolid from 'icons/CogSolid';
import { useBusinessShowHide } from 'pages/@hooks/useBusinessShowHide';
import { Business } from 'types/business';
import { getDashboardBusinessRoute, getOneBusinessRoute } from 'utils/business';
import { BusinessTab, getBusinessTabLabel } from 'utils/view';

export interface FooterBusinessOptionsProps {
  business: Business;
  onRefresh: () => void;
  active?: boolean;
}

export const FooterBusinessOptions = ({
  business,
  onRefresh,
  active,
}: FooterBusinessOptionsProps) => {
  const { routeName, hidden, name } = business;

  const { pushRoute, query, isOneBusinessPage } = useRouter();

  const { getEnabledFeature } = useAdminConfig();

  const { onBusinessShowHide } = useBusinessShowHide();

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

  const subLabel = getSubLabel();
  return (
    <Menu
      buttonElement={
        <FooterButton
          label={
            <div className="flex flex-col items-center">
              {name}
              {subLabel && <span className="text-xs">({subLabel})</span>}
            </div>
          }
          svg={SvgCogSolid}
          active={active}
        />
      }
      items={[
        {
          label: 'Ver la página',
          onClick: () => {
            pushRoute(getOneBusinessRoute({ routeName }));
          },
        },
        {
          label: `${hidden ? 'Mostrar' : 'Ocultar'}`,
          onClick: () => {
            onBusinessShowHide(business, {
              onAfterSuccess: () => {
                onRefresh();
              },
            });
          },
        },
        {
          label: getBusinessTabLabel('settings'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'settings' });
          },
          active: query.businessTab === 'settings',
        },
        getEnabledFeature('BILLIING_THE_BUSINESS') && {
          label: getBusinessTabLabel('billing'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'billing' });
          },
          active: query.businessTab === 'billing',
        },
        {
          label: getBusinessTabLabel('products'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'products' });
          },
          active: query.businessTab === 'products',
        },
        {
          label: getBusinessTabLabel('links'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'links' });
          },
          active: query.businessTab === 'links',
        },
        {
          label: getBusinessTabLabel('sections'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'sections' });
          },
          active: query.businessTab === 'sections',
        },
        {
          label: getBusinessTabLabel('shopping'),
          onClick: () => {
            pushRoute(getDashboardBusinessRoute({ routeName }), { businessTab: 'shopping' });
          },
          active: query.businessTab === 'shopping',
        },
      ]}
    />
  );
};
