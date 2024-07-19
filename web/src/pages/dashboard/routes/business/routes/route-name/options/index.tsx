import { Divider } from 'components/divider';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonView } from 'components/icon-button-view';
import { IconShowHide } from 'components/icon-show-hide';
import { IconView } from 'components/icon-view';
import { Menu } from 'components/menu';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { getBusinessTabLabel } from '../utils';

import SvgCogSolid from 'icons/CogSolid';
import SvgLayerGroupSolid from 'icons/LayerGroupSolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgProductHunt from 'icons/ProductHunt';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { BannerInfoTelegramBusiness } from 'pages/@common/banner-info-telegram-business';
import { BannerInfoTotalDebitBusiness } from 'pages/@common/banner-info-total-debit-business';
import { useBusinessShowHide } from 'pages/@hooks/useBusinessShowHide';
import { Business } from 'types/business';
import { getOneBusinessRoute } from 'utils/business';

export interface OptionsProps {
  business: Business;
  onRefresh: () => void;
}

export const Options = ({ business, onRefresh }: OptionsProps) => {
  const { routeName, hidden } = business;
  const { allUserBusiness } = useAllUserBusiness();

  const { pushRoute, onChangeQuery, query } = useRouter();

  const { getEnabledFeature } = useAdminConfig();

  const { onBusinessShowHide } = useBusinessShowHide();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <IconButtonShowHide
          hidden={hidden}
          title={`${hidden ? 'Mostrar' : 'Ocultar'} este negocio`}
          onClick={() => {
            onBusinessShowHide(business, {
              onAfterSuccess: () => {
                onRefresh();
                allUserBusiness.refresh();
              },
            });
          }}
        />

        <IconButtonView
          title="Ver la página de este negocio"
          onClick={() => {
            pushRoute(getOneBusinessRoute({ routeName }));
          }}
        />

        <Menu
          className="sm:hidden"
          buttonElement={<IconButtonOptionsBars />}
          bottomElement={
            <div className="flex flex-col items-center gap-2 p-2">
              <Divider className="!m-0" />

              <BannerInfoTelegramBusiness className="flex sm:hidden" />

              <BannerInfoTotalDebitBusiness className="flex sm:hidden" />
            </div>
          }
          items={[
            {
              label: 'Ver la página',
              onClick: () => {
                pushRoute(getOneBusinessRoute({ routeName }));
              },
              svg: IconView,
              divider: 'Generales del negocio',
            },
            {
              label: `${hidden ? 'Mostrar' : 'Ocultar'}`,
              onClick: () => {
                onBusinessShowHide(business, {
                  onAfterSuccess: () => {
                    onRefresh();
                    allUserBusiness.refresh();
                  },
                });
              },
              svg: ({ className }) => <IconShowHide hidden={hidden} className={className} />,
            },
            {
              label: getBusinessTabLabel('settings'),
              onClick: () => onChangeQuery({ businessTab: 'settings' }),
              svg: SvgCogSolid,
              active: query.businessTab === 'settings',
            },
            getEnabledFeature('BILLIING_THE_BUSINESS') && {
              label: getBusinessTabLabel('billing'),
              onClick: () => onChangeQuery({ businessTab: 'billing' }),
              svg: SvgMoneyBillAltSolid,
              active: query.businessTab === 'billing',
            },
            {
              label: getBusinessTabLabel('products'),
              onClick: () => onChangeQuery({ businessTab: 'products' }),
              svg: SvgProductHunt,
              active: query.businessTab === 'products',
              divider: 'Tablas',
            },
            {
              label: getBusinessTabLabel('links'),
              onClick: () => onChangeQuery({ businessTab: 'links' }),
              svg: SvgLinkSolid,
              active: query.businessTab === 'links',
            },
            {
              label: getBusinessTabLabel('sections'),
              onClick: () => onChangeQuery({ businessTab: 'sections' }),
              svg: SvgLayerGroupSolid,
              active: query.businessTab === 'sections',
            },
            {
              label: getBusinessTabLabel('shopping'),
              onClick: () => onChangeQuery({ businessTab: 'shopping' }),
              svg: SvgShoppingCartSolid,
              active: query.businessTab === 'shopping',
            },
          ]}
        />
      </div>
    </div>
  );
};
