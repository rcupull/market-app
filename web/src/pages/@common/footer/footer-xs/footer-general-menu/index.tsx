import { Menu, MenuItem } from 'components/menu';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { useRouter } from 'hooks/useRouter';

import { FooterButton } from '../footer-button';

import SvgShoppingBagSolid from 'icons/ShoppingBagSolid';
import { Nullable } from 'types/general';
import { getBusinessRoute } from 'utils/business';
import { cn } from 'utils/general';

export const FooterGeneralMenu = () => {
  const { pushRoute, isOneBusinessPage } = useRouter();

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
