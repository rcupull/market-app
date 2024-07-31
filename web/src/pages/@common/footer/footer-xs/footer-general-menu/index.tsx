import { Button } from 'components/button';
import { Menu, MenuItem } from 'components/menu';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { FooterButton } from '../footer-button';

import SvgShoppingBagSolid from 'icons/ShoppingBagSolid';
import { useBusinessUpdateNewModal } from 'pages/@modals/useBusinessUpdateNewModal';
import { Nullable } from 'types/general';
import { getBusinessRoute, getDashboardBusinessRoute } from 'utils/business';
import { cn } from 'utils/general';

export const FooterGeneralMenu = () => {
  const { pushRoute, isOneBusinessPage } = useRouter();

  const { businessUpdateNewModal } = useBusinessUpdateNewModal();

  const { allUserBusiness } = useAllUserBusiness();

  const { getEnabledFeature } = useAdminConfig();

  const getGeneralItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
      {
        label: 'Inicio',
        onClick: () => pushRoute('/'),
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      {
        label: 'Todos los negocios',
        onClick: () => pushRoute(getBusinessRoute()),
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      getEnabledFeature('BILLIING_THE_BUSINESS') && {
        label: 'Precios',
        onClick: () => pushRoute('/price'),
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      {
        label: '¿Que es Asere Market?',
        onClick: () => pushRoute('/about-us'),
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
    ];

    out.push({
      label: (
        <div className="flex justify-center w-full -my-2">
          <Button
            title="Agragar nuevo negocio"
            label="Nuevo negocio"
            variant="primary"
            onClick={() => {
              businessUpdateNewModal.open({
                onAfterSucess: (newBussiness) => {
                  if (newBussiness) {
                    const { routeName } = newBussiness;
                    pushRoute(getDashboardBusinessRoute({ routeName }), {}, { timeout: 100 });
                    allUserBusiness.refresh();
                  }
                },
              });
            }}
            className="!rounded-2xl !py-0 my-1"
          />
        </div>
      ),
    });

    return out;
  };

  return (
    <Menu
      buttonElement={<FooterButton label="Asere Market" svg={SvgShoppingBagSolid} />}
      items={getGeneralItems()}
      className="flex-shrink-0"
    />
  );
};
