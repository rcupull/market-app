import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonView } from 'components/icon-button-view';
import { IconShowHide } from 'components/icon-show-hide';
import { IconView } from 'components/icon-view';
import { Menu } from 'components/menu';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { BusinessTab, getBusinessTabLabel } from '../utils';

import SvgCogSolid from 'icons/CogSolid';
import SvgLayerGroupSolid from 'icons/LayerGroupSolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgProductHunt from 'icons/ProductHunt';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { BannerInfoTelegramBusiness } from 'pages/@common/banner-info-telegram-business';
import { BannerInfoTotalDebitBusiness } from 'pages/@common/banner-info-total-debit-business';
import { Business } from 'types/business';
import { getOneBusinessRoute } from 'utils/business';

export interface OptionsProps {
  business: Business;
  onRefresh: () => void;
}

export const Options = ({ business, onRefresh }: OptionsProps) => {
  const { routeName, hidden } = business;
  const allUserBusiness = useAllUserBusiness();

  const { pushModal } = useModal();
  const { pushRoute, onChangeQuery, query } = useRouter();

  const { getEnabledFeature } = useAdminConfig();
  const handleShowHide = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const { updateOneBusiness } = useUpdateOneBusiness();

          return {
            className: 'max-w-lg',
            content: hidden
              ? 'Esta función mostrará todas tus publicaciones que no estén propiamente ocultas. ¿Estás seguro de continuar?'
              : 'Esta función ocultará todas tus publicaciones. ¿Estás seguro de continuar?',
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <Button
                label={hidden ? 'Mostrar' : 'Ocultar'}
                onClick={() => {
                  updateOneBusiness.fetch(
                    {
                      routeName,
                      update: {
                        hidden: !hidden,
                      },
                    },
                    {
                      onAfterSuccess: () => {
                        onRefresh();
                        allUserBusiness.refresh();
                        onClose();
                      },
                    }
                  );
                }}
              />
            ),
          };
        },
      },
      { emergent: true }
    );
  };

  return (
    <div className="w-full flex items-center justify-between">
      {query.businessTab && (
        <span className="font-bold mr-2 sm:hidden">
          {getBusinessTabLabel(query.businessTab as BusinessTab)}
        </span>
      )}

      <div className="flex items-center">
        <IconButtonShowHide
          hidden={hidden}
          title={`${hidden ? 'Mostrar' : 'Ocultar'} este negocio`}
          onClick={handleShowHide}
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
              onClick: handleShowHide,
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
