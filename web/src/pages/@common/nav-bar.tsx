import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  HomeIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import { IconButton } from 'components/icon-button';
import { IconUpdate } from 'components/icon-update';
import { Menu } from 'components/menu';
import { NavBar as NavBarBase } from 'components/nav-bar';

import { useAuthSignOut } from 'features/api/auth/useAuthSignOut';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { BusinessLogo } from './business-logo';
import { BusinessName } from './business-name';
import { ShoppingCartMenu } from './shopping-cart-menu';

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
} from 'utils/business';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isAdmin, isUser, isAuthenticated, authData, onRefreshAuthUser } = useAuth();
  const { authSignOut } = useAuthSignOut();
  const { user } = authData || {};
  const { isBusinessPage, params, isAuthenticatedPage } = useRouter();
  const { routeName } = params;
  const { business, hasSomeShoppingCartStrategy } = useBusiness();
  const authChangePasswordModal = useAuthChangePasswordModal();
  const aboutUsPage = business?.aboutUsPage || {};
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const authSignInModal = useAuthSignInModal();
  const authSignUpModal = useAuthSignUpModal();
  const authForgotPasswordRequestModal = useAuthForgotPasswordRequestModal();
  const callAfarResourcesRefreshUser = 'callAfarResourcesRefreshUser';
  useCallFromAfar(callAfarResourcesRefreshUser, onRefreshAuthUser);

  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessLogo className="hidden sm:block flex-shrink-0" />
          <BusinessName className="ml-10 sm:ml-0 mr-auto flex-shrink-0" />
          <div className="w-px h-3/6 bg-gray-400 hidden sm:block flex-shrink-0" />
        </>
      }
      items={[
        isBusinessPage &&
          !!routeName && { name: 'Publicaciones', href: getBusinessRoute({ routeName }) },
        isBusinessPage &&
          aboutUsPage?.visible &&
          !!aboutUsPage.title &&
          !!routeName && {
            name: aboutUsPage.title,
            href: getBusinessAboutUsRoute({ routeName }),
          },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        !isBusinessPage && { name: 'Home', href: '/' },
        !isBusinessPage && { name: 'Precios', href: '/payment-plans' },
        !isBusinessPage && { name: '¿Que es Asere Market?', href: '/about-us' },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        isAdmin && { name: 'Admin', href: '/admin', className: '!ml-auto' },
      ]}
      postContent={
        <>
          {isBusinessPage && (
            <IconButton
              title="Página inicial"
              svg={() => <HomeIcon className="size-7" />}
              dark
              onClick={() => pushRoute('/')}
            />
          )}
          {isBusinessPage && hasSomeShoppingCartStrategy && <ShoppingCartMenu />}
          {isUser && (
            <IconButton
              title="Panel de Control"
              svg={() => <Cog8ToothIcon className="size-7" />}
              dark
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
          (
          <Menu
            buttonElement={<IconButton svg={() => <UserIcon className="size-7" />} dark />}
            headerElement={
              <>
                {user ? (
                  <div className="px-2 py-3 flex flex-col items-center border">
                    <span className="text-sm border px-2 py-1 rounded-2xl">{user.name}</span>
                    <span className="text-xs mt-2">{user.email}</span>
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
              { label: 'Inicio', href: '/', svg: HomeIcon },
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
              !isAuthenticated && {
                label: 'Iniciar sesión',
                onClick: () => authSignInModal.open(),
                svg: ArrowRightEndOnRectangleIcon,
              },
              !isAuthenticated && {
                label: 'Créate una cuenta',
                onClick: () => authSignUpModal.open(),
                svg: UserPlusIcon,
              },
              !isAuthenticated && {
                label: 'Recupera tu cuenta olvidada',
                onClick: () => authForgotPasswordRequestModal.open(),
                svg: UserCircleIcon,
              },
              isAuthenticated && {
                label: 'Cerrar sesión',
                onClick: () => {
                  if (isAuthenticatedPage) {
                    pushRoute('/');
                  }
                  setTimeout(() => authSignOut.fetch(), 500);
                },
                svg: ArrowRightStartOnRectangleIcon,
              },
              isAuthenticated && {
                label: 'Cambiar contraseña',
                onClick: () => {
                  authChangePasswordModal.open();
                },
                svg: KeyIcon,
              },
              { label: 'Saber más sobre nosotros', href: '/about-us', svg: UserGroupIcon },
            ]}
            className="flex-shrink-0"
          />
          )
        </>
      }
    />
  );
};
