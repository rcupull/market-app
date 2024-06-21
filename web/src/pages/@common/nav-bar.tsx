import { DevSwitchSession } from 'components/dev-switch-session';
import { IconButton } from 'components/icon-button';
import { IconUpdate } from 'components/icon-update';
import { Menu } from 'components/menu';
import { NavBar as NavBarBase } from 'components/nav-bar';
import { UserAvatar } from 'components/user-avatar';

import { useAuth } from 'features/api-slices/useAuth';
import { useSignOut } from 'features/api-slices/useSignOut';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { BannerInfoTelegramUser } from './banner-info-telegram-user';
import { BusinessLogo } from './business-logo';
import { BusinessName } from './business-name';
import { ShoppingCartMenu } from './shopping-cart-menu';

import SvgBarsSolid from 'icons/BarsSolid';
import SvgCogSolid from 'icons/CogSolid';
import SvgDollarSignSolid from 'icons/DollarSignSolid';
import SvgHomeSolid from 'icons/HomeSolid';
import SvgKeySolid from 'icons/KeySolid';
import SvgLinkSolid from 'icons/LinkSolid';
import SvgSignInAltSolid from 'icons/SignInAltSolid';
import SvgSignOutAltSolid from 'icons/SignOutAltSolid';
import SvgStoreSolid from 'icons/StoreSolid';
import SvgUserCircleSolid from 'icons/UserCircleSolid';
import SvgUserPlusSolid from 'icons/UserPlusSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useAuthChangePasswordModal } from 'pages/@modals/useAuthChangePasswordModal';
import { useAuthForgotPasswordRequestModal } from 'pages/@modals/useAuthForgotPasswordRequestModal';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';
import { StyleProps } from 'types/general';
import {
  getBusinessAboutUsRoute,
  getBusinessRoute,
  getDashboardBusinessRoute,
  getDashboardRoute,
  getOneBusinessRoute,
  getShoppingRoute,
} from 'utils/business';
import { cn, copyToClipboard } from 'utils/general';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isAdmin, isUser, isAuthenticated, authData, onRefreshAuthUser } = useAuth();
  const { signOut } = useSignOut();
  const { user } = authData || {};
  const { isOneBusinessPage, params, isAuthenticatedPage, pushRoute, isPostPage } = useRouter();
  const { routeName } = params;
  const { business } = useBusiness();
  const authChangePasswordModal = useAuthChangePasswordModal();
  const aboutUsPage = business?.aboutUsPage || {};
  const { pushModal } = useModal();

  const authSignInModal = useAuthSignInModal();
  const authSignUpModal = useAuthSignUpModal();
  const authForgotPasswordRequestModal = useAuthForgotPasswordRequestModal();
  const callAfarResourcesRefreshUser = 'callAfarResourcesRefreshUser';
  useCallFromAfar(callAfarResourcesRefreshUser, onRefreshAuthUser);

  const getCopyLinkLabel = () => {
    if (isPostPage) {
      return 'Copiar el link de este producto';
    }
    if (isOneBusinessPage) {
      return 'Copiar el link de este negocio';
    }

    return 'Copiar link';
  };

  const navBarMenu = (
    <Menu
      buttonElement={
        isAuthenticated ? <UserAvatar /> : <IconButton svg={<SvgBarsSolid className="!size-7" />} />
      }
      topElement={
        <>
          {user ? (
            <div className="px-2 py-3 flex flex-col gap-3 items-center border">
              <span className="text-sm border px-2 py-1 rounded-2xl">{user.name}</span>
              <span className="text-xs">{user.email}</span>
              <BannerInfoTelegramUser />
            </div>
          ) : (
            <div className="w-64 m-2 rounded-md px-4 py-3 border flex items-center justify-center">
              <span className="text-center">
                Haz crecer tu negocio online en Cuba y usa{' '}
                <span className="font-bold">Asere Market</span> para enganchar a tus clientes
              </span>
            </div>
          )}
        </>
      }
      items={[
        {
          label: 'Inicio',
          onClick: () => pushRoute('/'),
          svg: SvgHomeSolid,
          className: cn('sm:hidden', {
            '!block': isOneBusinessPage,
          }),
        },
        {
          label: 'Todos los negocios',
          onClick: () => pushRoute(getBusinessRoute()),
          svg: SvgStoreSolid,
          className: cn('sm:hidden', {
            '!block': isOneBusinessPage,
          }),
        },
        {
          label: 'Precios',
          onClick: () => pushRoute('/price'),
          svg: SvgDollarSignSolid,
          className: cn('sm:hidden', {
            '!block': isOneBusinessPage,
          }),
        },
        {
          label: '¿Que es Asere Market?',
          onClick: () => pushRoute('/about-us'),
          svg: SvgUsersSolid,
          className: cn('sm:hidden', {
            '!block': isOneBusinessPage,
          }),
          divider: true,
        },
        user && {
          label: 'Editar perfil',
          onClick: () => {
            pushModal('ProfileUpdate', {
              userId: user._id,
              callAfarResources: callAfarResourcesRefreshUser,
            });
          },
          svg: IconUpdate,
        },
        {
          label: getCopyLinkLabel(),
          onClick: () => {
            copyToClipboard(window.location.href);
          },
          svg: SvgLinkSolid,
        },
        !isAuthenticated && {
          label: 'Iniciar sesión',
          onClick: () => authSignInModal.open(),
          svg: SvgSignInAltSolid,
        },
        !isAuthenticated && {
          label: 'Créate una cuenta',
          onClick: () => authSignUpModal.open(),
          svg: SvgUserPlusSolid,
        },
        !isAuthenticated && {
          label: 'Recupera tu cuenta olvidada',
          onClick: () => authForgotPasswordRequestModal.open(),
          svg: SvgUserCircleSolid,
        },
        isAuthenticated && {
          label: 'Cerrar sesión',
          onClick: () => {
            if (isAuthenticatedPage) {
              pushRoute('/');
            }
            setTimeout(() => signOut.fetch(), 200);
          },
          svg: SvgSignOutAltSolid,
        },
        isAuthenticated && {
          label: 'Cambiar contraseña',
          onClick: () => {
            authChangePasswordModal.open();
          },
          svg: SvgKeySolid,
        },
      ]}
      className="flex-shrink-0"
    />
  );

  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessLogo className="hidden sm:block flex-shrink-0" />
          <BusinessName className="flex-shrink-0 ml-12 sm:ml-0" />
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
            href: getBusinessAboutUsRoute({ routeName }),
          },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        !isOneBusinessPage && { name: 'Inicio', href: '/' },
        !isOneBusinessPage && { name: 'Todos los negocios', href: getBusinessRoute() },
        !isOneBusinessPage && { name: 'Precios', href: '/price' },
        !isOneBusinessPage && { name: '¿Que es Asere Market?', href: '/about-us' },
        !isOneBusinessPage && DEVELOPMENT && { name: 'Documentación', href: '/docs' },
        ////////////////////////////////////////////////////////////////////////////////////////////////
      ]}
      postContent={
        <>
          <DevSwitchSession />

          {isAdmin && (
            <IconButton
              title="Administración"
              svg={<SvgCogSolid className="!size-7" />}
              onClick={() => pushRoute('/admin')}
              className="hidden sm:block"
            />
          )}
          {isOneBusinessPage && <ShoppingCartMenu />}
          {isUser && (
            <IconButton
              title="Mi panel"
              svg={<SvgStoreSolid className="!size-7" />}
              onClick={() => {
                if (routeName) {
                  pushRoute(getDashboardBusinessRoute({ routeName }));
                } else {
                  pushRoute(getDashboardRoute());
                }
              }}
              className="hidden sm:block"
            />
          )}
          {navBarMenu}
        </>
      }
    />
  );
};
