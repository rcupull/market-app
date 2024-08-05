import { DevSwitchSession } from 'components/dev-switch-session';
import { NavBar as NavBarBase } from 'components/nav-bar';

import { useAdminConfig } from 'features/api-slices/useAdminConfig';

import { useRouter } from 'hooks/useRouter';

import { BusinessLogo } from '../business-logo';
import { BusinessName } from '../business-name';
import { ShoppingCartMenu } from '../shopping-cart-menu';
import { NavbarMenu } from './NavbarMenu';

import SvgBookSolid from 'icons/BookSolid';
import SvgDollarSignSolid from 'icons/DollarSignSolid';
import SvgFileAltSolid from 'icons/FileAltSolid';
import SvgUserSecretSolid from 'icons/UserSecretSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import {
  getBusinessAboutUsRoute,
  getBusinessRoute,
  getOneBusinessRoute,
  getShoppingRoute
} from 'utils/business';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isOneBusinessPage, params, pushRoute, pathname } = useRouter();
  const { routeName } = params;
  const { business } = useBusiness();
  const { getEnabledFeature } = useAdminConfig();
  const aboutUsPage = business?.aboutUsPage || {};

  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessLogo className="flex-shrink-0" />
          <BusinessName className="flex-shrink-0" />
        </>
      }
      items={[
        isOneBusinessPage &&
          !!routeName && { name: 'Productos', href: getOneBusinessRoute({ routeName }) },
        isOneBusinessPage &&
          !!routeName && { name: 'Mis compras', href: getShoppingRoute({ routeName }) },
        isOneBusinessPage &&
          aboutUsPage?.visible &&
          !!aboutUsPage.title &&
          !!routeName && {
            name: aboutUsPage.title,
            href: getBusinessAboutUsRoute({ routeName })
          },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        !isOneBusinessPage && { name: 'Inicio', href: '/' },
        !isOneBusinessPage && { name: 'Todos los negocios', href: getBusinessRoute() },
        !isOneBusinessPage && {
          name: 'Asere Market',
          menuProps: {
            items: [
              {
                label: '¿Que es Asere Market?',
                onClick: () => pushRoute('/about-us'),
                svg: SvgUsersSolid,
                active: pathname === '/about-us'
              },
              getEnabledFeature('BILLIING_THE_BUSINESS') && {
                label: 'Precios',
                onClick: () => pushRoute('/price'),
                svg: SvgDollarSignSolid,
                active: pathname === '/price'
              },
              {
                label: 'Términos y condiciones',
                onClick: () => pushRoute('/terms-and-conditions'),
                svg: SvgFileAltSolid,
                active: pathname === '/terms-and-conditions'
              },
              {
                label: 'Política de privacidad',
                onClick: () => pushRoute('/privacy-policy'),
                svg: SvgUserSecretSolid,
                active: pathname === '/privacy-policy'
              },
              DEVELOPMENT && {
                label: 'Documentación',
                onClick: () => pushRoute('/docs'),
                svg: SvgBookSolid,
                active: pathname === '/docs'
              }
            ]
          }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
      ]}
      postContent={
        <>
          <DevSwitchSession />

          {isOneBusinessPage && <ShoppingCartMenu />}

          <NavbarMenu />
        </>
      }
    />
  );
};
