import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { IconShowHide } from 'components/icon-show-hide';
import { Menu, MenuItem } from 'components/menu';
import { UserAvatar } from 'components/user-avatar';

import { useAdminBDScript } from 'features/api/admin/useAdminBDScript';
import { useGetAgendaTokenAdmin } from 'features/api/admin/useGetAgendaTokenAdmin';
import { useAdminConfig } from 'features/api-slices/useAdminConfig';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useSignOut } from 'features/api-slices/useSignOut';

import { useRouter } from 'hooks/useRouter';

import { BannerInfoTelegramUser } from '../banner-info-telegram-user';

import SvgBarsSolid from 'icons/BarsSolid';
import SvgCalendar from 'icons/Calendar';
import SvgCogSolid from 'icons/CogSolid';
import SvgDollarSignSolid from 'icons/DollarSignSolid';
import SvgHomeSolid from 'icons/HomeSolid';
import SvgKeySolid from 'icons/KeySolid';
import SvgMoneyBillAltSolid from 'icons/MoneyBillAltSolid';
import SvgProductHunt from 'icons/ProductHunt';
import SvgRunningSolid from 'icons/RunningSolid';
import SvgShoppingBagSolid from 'icons/ShoppingBagSolid';
import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import SvgSignInAltSolid from 'icons/SignInAltSolid';
import SvgSignOutAltSolid from 'icons/SignOutAltSolid';
import SvgStoreSolid from 'icons/StoreSolid';
import SvgTrainSolid from 'icons/TrainSolid';
import SvgUserCircleSolid from 'icons/UserCircleSolid';
import SvgUserPlusSolid from 'icons/UserPlusSolid';
import SvgUsersSolid from 'icons/UsersSolid';
import { useAuthChangePasswordModal } from 'pages/@modals/useAuthChangePasswordModal';
import { useAuthForgotPasswordRequestModal } from 'pages/@modals/useAuthForgotPasswordRequestModal';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useAuthSignUpModal } from 'pages/@modals/useAuthSignUpModal';
import { useBusinessUpdateNewModal } from 'pages/@modals/useBusinessUpdateNewModal';
import { useUserUpdateSettings } from 'pages/@modals/useUserUpdateSettings';
import { Nullable } from 'types/general';
import { getEndpoint } from 'utils/api';
import {
  getBusinessRoute,
  getDashboardBusinessRoute,
  getOneBusinessRoute,
  getShoppingRoute,
} from 'utils/business';
import { cn } from 'utils/general';

export const NavbarMenu = () => {
  const { isAuthenticated, authData, isUser, isAdmin, getHasSomeAccess, onRefreshAuthUser } =
    useAuth();
  const { signOut } = useSignOut();
  const { user } = authData || {};
  const { isOneBusinessPage, params, isAuthenticatedPage, pushRoute } = useRouter();
  const { routeName } = params;
  const authChangePasswordModal = useAuthChangePasswordModal();
  const userUpdateSettings = useUserUpdateSettings();
  const { getEnabledFeature } = useAdminConfig();

  const businessUpdateNewModal = useBusinessUpdateNewModal();

  const authSignInModal = useAuthSignInModal();
  const authSignUpModal = useAuthSignUpModal();
  const authForgotPasswordRequestModal = useAuthForgotPasswordRequestModal();

  const { allUserBusiness } = useAllUserBusiness();

  // const getCopyLinkLabel = () => {
  //   if (isPostPage) {
  //     return 'Copiar el link de este producto';
  //   }
  //   if (isOneBusinessPage) {
  //     return 'Copiar el link de este negocio';
  //   }

  //   return 'Copiar link';
  // };

  const addDividerToFirst = (
    items: Array<Nullable<MenuItem>>,
    label: string
  ): Array<Nullable<MenuItem>> => {
    const out = [...items];
    const firstNotNullElement = out.findIndex((item) => !!item);

    if (firstNotNullElement >= 0 && out[firstNotNullElement]) {
      out[firstNotNullElement].divider = label;
    }

    return out;
  };

  const getBusinessItems = (): Array<Nullable<MenuItem>> => {
    if (!isAuthenticated || !isUser) return [];

    const out: Array<MenuItem> = (allUserBusiness.data || []).map(({ name, routeName, hidden }) => {
      return {
        label: name,
        onClick: () => pushRoute(getDashboardBusinessRoute({ routeName })),
        svg: ({ className }) => (
          <IconShowHide
            className={cn(
              className,
              cn({
                'fill-gray-500 ': hidden,
              })
            )}
            hidden={hidden}
          />
        ),
        className: cn({
          'bg-gray-100': hidden,
        }),
      };
    });

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

    return addDividerToFirst(out, 'Mis negocios');
  };

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const { getAgendaTokenAdmin } = useGetAgendaTokenAdmin();
  const { adminBDScript } = useAdminBDScript();

  const getAdminItems = (): Array<Nullable<MenuItem>> => {
    if (!isAuthenticated || !isAdmin) return [];

    const out: Array<Nullable<MenuItem>> = [
      getHasSomeAccess('user__read') && {
        label: 'Usuarios',
        onClick: () => pushRoute('/admin/users'),
        svg: SvgUsersSolid,
      },
      {
        label: 'Órdenes de compra',
        onClick: () => pushRoute('/admin/shopping'),
        svg: SvgShoppingCartSolid,
      },
      {
        label: 'Negocios',
        onClick: () => pushRoute('/admin/business'),
        svg: SvgStoreSolid,
      },
      getHasSomeAccess('bills__read') && {
        label: 'Facturas',
        onClick: () => pushRoute('/admin/bills'),
        svg: SvgMoneyBillAltSolid,
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
                  urlParams: { agendaToken },
                })
              );
            },
          });
        },
        svg: SvgCalendar,
      },
      {
        label: 'Configuración',
        onClick: () => pushRoute('/admin/settings'),
        svg: SvgCogSolid,
      },
      {
        label: 'Nlp',
        onClick: () => pushRoute('/admin/nlp'),
        svg: SvgTrainSolid,
      },
      getHasSomeAccess('full') && {
        label: 'Run BD script',
        onClick: () => adminBDScript.fetch(),
        svg: SvgRunningSolid,
      },
    ];

    return addDividerToFirst(out, 'Administración');
  };

  const getAccountItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
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
        divider: 'Mi cuenta',
      },
      isAuthenticated && {
        label: 'Cambiar contraseña',
        onClick: () => {
          authChangePasswordModal.open();
        },
        svg: SvgKeySolid,
      },
      isAuthenticated && {
        label: 'Preferencias de usuario',
        onClick: () => {
          user && userUpdateSettings.open({ user, onAfterSuccess: () => onRefreshAuthUser() });
        },
        svg: SvgCogSolid,
      },
    ];

    return addDividerToFirst(out, 'Mi cuenta');
  };

  const getGeneralItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
      {
        label: 'Inicio',
        onClick: () => pushRoute('/'),
        svg: SvgHomeSolid,
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      {
        label: 'Todos los negocios',
        onClick: () => pushRoute(getBusinessRoute()),
        svg: SvgStoreSolid,
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      getEnabledFeature('BILLIING_THE_BUSINESS') && {
        label: 'Precios',
        onClick: () => pushRoute('/price'),
        svg: SvgDollarSignSolid,
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
      {
        label: '¿Que es Asere Market?',
        onClick: () => pushRoute('/about-us'),
        svg: SvgUsersSolid,
        className: cn('lg:hidden', {
          '!block': isOneBusinessPage,
        }),
      },
    ];

    return addDividerToFirst(out, 'Generales');
  };

  const getThisBusinessItems = (): Array<Nullable<MenuItem>> => {
    if (!isOneBusinessPage) return [];

    const out: Array<Nullable<MenuItem>> = [
      {
        label: 'Productos',
        onClick: () => routeName && pushRoute(getOneBusinessRoute({ routeName })),
        svg: SvgProductHunt,
        className: cn('lg:hidden'),
      },
      {
        label: 'Mis compras',
        onClick: () => routeName && pushRoute(getShoppingRoute({ routeName })),
        svg: SvgShoppingBagSolid,
        className: cn('lg:hidden'),
      },
    ];

    return addDividerToFirst(out, 'En este negocio');
  };

  return (
    <Menu
      buttonElement={
        isAuthenticated ? <UserAvatar /> : <IconButton svg={<SvgBarsSolid className="!size-7" />} />
      }
      topElement={
        <>
          {user ? (
            <div className="px-2 py-3 flex flex-col gap-3 items-center">
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
        ...getThisBusinessItems(),
        /////////////////////////////////////////////////////////////////////////////
        ...getGeneralItems(),
        // {
        //   label: getCopyLinkLabel(),
        //   onClick: () => {
        //     copyToClipboard(window.location.href);
        //   },
        //   svg: SvgLinkSolid,
        // },
        ...getAccountItems(),
        ...getBusinessItems(),
        ...getAdminItems(),
      ]}
      className="flex-shrink-0"
    />
  );
};
