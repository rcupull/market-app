import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { IconShowHide } from 'components/icon-show-hide';
import { Menu, MenuItem } from 'components/menu';
import { UserAvatar } from 'components/user-avatar';

import { useAdminBDScript } from 'features/api/admin/useAdminBDScript';
import { useGetAgendaTokenAdmin } from 'features/api/admin/useGetAgendaTokenAdmin';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';
import { useSignOut } from 'features/api-slices/useSignOut';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useRouter } from 'hooks/useRouter';

import { BannerInfoTelegramUser } from '../banner-info-telegram-user';

import SvgBarsSolid from 'icons/BarsSolid';
import SvgCalendar from 'icons/Calendar';
import SvgCogSolid from 'icons/CogSolid';
import SvgEllipsisVSolid from 'icons/EllipsisVSolid';
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
import { useUserUpdateSettingsModal } from 'pages/@modals/useUserUpdateSettingsModal';
import { Nullable } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getDashboardBusinessRoute, getOneBusinessRoute, getShoppingRoute } from 'utils/business';
import { cn } from 'utils/general';

export const NavbarMenu = () => {
  const {
    isAuthenticated,
    getIsAdmin,
    user,
    getIsBusinessUser,
    getHasSomeAccess,
    onRefreshAuthUser,
  } = useAuth();
  const { signOut } = useSignOut();
  const { isOneBusinessPage, params, isAuthenticatedPage, pushRoute } = useRouter();
  const { routeName } = params;
  const { authChangePasswordModal } = useAuthChangePasswordModal();
  const { userUpdateSettingsModal } = useUserUpdateSettingsModal();
  const breakpoints = useBreakpoints();

  const { businessUpdateNewModal } = useBusinessUpdateNewModal();

  const { authSignInModal } = useAuthSignInModal();
  const { authSignUpModal } = useAuthSignUpModal();
  const { authForgotPasswordRequestModal } = useAuthForgotPasswordRequestModal();

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

    const firstItem = firstNotNullElement >= 0 ? out[firstNotNullElement] : null;

    if (firstItem) {
      firstItem.divider = label;
    }

    return out;
  };

  const getBusinessItems = (): Array<Nullable<MenuItem>> => {
    if (!isAuthenticated || !getIsBusinessUser(user) || breakpoints.xs) return [];

    const out: Array<MenuItem> = (allUserBusiness.data || []).map(({ name, routeName, hidden }) => {
      const isCurrentBusiness = params.routeName === routeName;

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
          'bg-indigo-100': isCurrentBusiness,
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
    if (!isAuthenticated || !getIsAdmin(user) || breakpoints.xs) return [];

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
        className: 'bg-green-100',
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
        className: 'bg-red-100',
      },
      isAuthenticated && {
        label: 'Cambiar contraseña',
        onClick: () => {
          authChangePasswordModal.open();
        },
        svg: SvgKeySolid,
      },
      isAuthenticated && {
        label: 'Ajustes',
        onClick: () => {
          user && userUpdateSettingsModal.open({ user, onAfterSuccess: () => onRefreshAuthUser() });
        },
        svg: SvgCogSolid,
      },
    ];

    return addDividerToFirst(out, 'Mi cuenta');
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

  const renderButtonElement = () => {
    if (breakpoints.xs) {
      return <IconButton svg={<SvgEllipsisVSolid className="!size-7" />} />;
    }

    if (isAuthenticated) {
      return <UserAvatar />;
    }

    return <IconButton svg={<SvgBarsSolid className="!size-7" />} />;
  };

  return (
    <Menu
      buttonElement={renderButtonElement()}
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
