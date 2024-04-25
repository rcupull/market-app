import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { ShoppingCartPosts } from '../shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from '../shopping-cart-remove-all-button';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBuyProductsModal } from 'pages/@modals/useBuyProductsModal';
import { StyleProps } from 'types/general';
import { getShoppingRoute } from 'utils/business';

export interface ShoppingCartMenuProps extends StyleProps {}

export const ShoppingCartMenu = ({ className }: ShoppingCartMenuProps) => {
  const buyProductsModal = useBuyProductsModal();
  const { business } = useBusiness();
  const shopping = useShopping();
  const { pushRoute, isShoppingPage } = useRouter();

  const { isAuthenticated } = useAuth();

  const authSignInModal = useAuthSignInModal();

  if (!business) {
    return <></>;
  }

  const { routeName } = business;

  const getHeaderElement = () => {
    if (!isAuthenticated) {
      return (
        <div>
          Si tienes artículos en tu bolsa de compras, los guardamos para ti.{' '}
          <Button
            onClick={() => authSignInModal.open()}
            label="INICIA SESSIÓN"
            variant="link"
            className="!inline-block"
          />{' '}
          ahora para verlos, o revísalos en cualquier momento.
        </div>
      );
    }

    if (!shopping.constructionShopping) {
      return (
        <div>
          <div className="text-center font-semibold text-lg my-2">
            Tu bolsa de compra esta vacía
          </div>

          <div className="text-center">
            Agrega productos a tu bolsa y te facilitaremos la compra.
          </div>
        </div>
      );
    }

    return (
      <div>
        <span>
          Haz crecer tu negocio online en Cuba y usa <span className="font-bold">Asere Market</span>{' '}
          para enganchar a tus clientes
        </span>

        <ShoppingCartPosts value={shopping.constructionShopping} />

        <div className="flex justify-between mt-2">
          <ShoppingCartRemoveAllButton />

          <Button
            variant="link"
            label="Crear orden de compra"
            onClick={() => buyProductsModal.open()}
            className="bg-indigo-600 text-white hover:text-gray-100 !px-2 !rounded-2xl"
          />
        </div>
      </div>
    );
  };

  return (
    <Menu
      buttonElement={
        <div className="relative">
          <IconButton
            title="Carro de Compras"
            svg={() => <ShoppingCartIcon className="size-7" />}
            dark
          />
          {isAuthenticated && (
            <span className="absolute text-gray-100 font-bold top-0 right-0">
              {shopping.constructionShoppingProductsCount}
            </span>
          )}
        </div>
      }
      headerElement={
        <div className="w-96 m-2 rounded-md px-4 py-3 border flex flex-col items-center">
          {!isShoppingPage && (
            <Button
              variant="link"
              className="!mb-2"
              label="Ver tu historial de compras en esta tienda"
              onClick={() => {
                pushRoute(getShoppingRoute({ routeName }));
              }}
            />
          )}

          {getHeaderElement()}
        </div>
      }
      items={[]}
      className={className}
    />
  );
};
