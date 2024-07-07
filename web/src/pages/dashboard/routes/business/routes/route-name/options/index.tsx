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
              ? 'Visualizar el negocio tambien mostrará todas las publicaciones qiue estaban visibles antes de ocultar el mismo. ¿Seguro que desea visualizar el negocio?'
              : 'Ocultar el negocio ocultará tambien todas las publicaciones del negocio. ¿Seguro que desea ocultar?',
            badge: <Badge variant="error" />,
            primaryBtn: (
              <Button
                label={hidden ? 'Mostrar' : 'Ocultar'}
                variant={hidden ? 'primary' : 'error'}
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

  const xsContent = (
    <div className="flex items-center">
      {query.businessTab && (
        <span className="font-bold mr-2 sm:hidden">
          {getBusinessTabLabel(query.businessTab as BusinessTab)}
        </span>
      )}
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
            label: 'Ver la página de este negocio',
            onClick: () => {
              pushRoute(getOneBusinessRoute({ routeName }));
            },
            svg: IconView,
          },
          {
            label: `${hidden ? 'Mostrar' : 'Ocultar'} este negocio`,
            onClick: handleShowHide,
            svg: ({ className }) => <IconShowHide hidden={hidden} className={className} />,
          },
          {
            label: getBusinessTabLabel('products'),
            onClick: () => onChangeQuery({ businessTab: 'products' }),
            svg: SvgProductHunt,
            active: query.businessTab === 'products',
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
          {
            label: getBusinessTabLabel('settings'),
            onClick: () => onChangeQuery({ businessTab: 'settings' }),
            svg: SvgCogSolid,
            active: query.businessTab === 'settings',
            divider: true,
          },
          {
            label: getBusinessTabLabel('billing'),
            onClick: () => onChangeQuery({ businessTab: 'billing' }),
            svg: SvgMoneyBillAltSolid,
            active: query.businessTab === 'billing',
          },
        ]}
      />
    </div>
  );

  const smContent = (
    <div className="items-center hidden sm:flex">
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
    </div>
  );

  return (
    <>
      {xsContent}
      {smContent}
    </>
  );
};
