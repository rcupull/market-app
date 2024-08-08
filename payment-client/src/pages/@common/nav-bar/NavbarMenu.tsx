import { IconButton } from 'components/icon-button';
import { Menu, MenuItem } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';
import { useSignOut } from 'features/api-slices/useSignOut';

import { useRouter } from 'hooks/useRouter';

import SvgEllipsisVSolid from 'icons/EllipsisVSolid';
import SvgSignInAltSolid from 'icons/SignInAltSolid';
import SvgSignOutAltSolid from 'icons/SignOutAltSolid';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { Nullable } from 'types/general';

export const NavbarMenu = () => {
  const { isAuthenticated } = useAuth();
  const { signOut } = useSignOut();
  const { isAuthenticatedPage, pushRoute } = useRouter();

  const { authSignInModal } = useAuthSignInModal();

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

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const getItems = (): Array<Nullable<MenuItem>> => {
    const out: Array<Nullable<MenuItem>> = [
      !isAuthenticated && {
        label: 'Iniciar sesión',
        onClick: () => authSignInModal.open(),
        svg: SvgSignInAltSolid,
        className: 'bg-green-100'
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
        className: 'bg-red-100'
      }
    ];

    return addDividerToFirst(out, 'Mi cuenta');
  };

  const renderButtonElement = () => {
    return <IconButton svg={<SvgEllipsisVSolid className="!size-7" />} />;
  };

  return (
    <Menu buttonElement={renderButtonElement()} items={[...getItems()]} className="flex-shrink-0" />
  );
};
