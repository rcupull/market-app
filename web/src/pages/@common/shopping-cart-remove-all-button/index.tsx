import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useRemoveShopping } from 'features/api/shopping/useRemoveShopping';
import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { StyleProps } from 'types/general';

export interface ShoppingCartRemoveAllButton extends StyleProps {}

export const ShoppingCartRemoveAllButton = ({ className }: ShoppingCartRemoveAllButton) => {
  const cart = useCart();
  const { business } = useBusiness();
  const { pushModal } = useModal();

  return (
    <Button
      label="Eliminar todos"
      variant="link"
      onClick={() => {
        pushModal(
          'Confirmation',
          {
            useProps: () => {
              const { onClose } = useModal();
              const { removeShopping } = useRemoveShopping();

              return {
                className: '!w-96',
                content: '¿Seguro que desea eliminar todos los artículos de su carro de compras?',
                badge: <Badge variant="error" />,
                primaryBtn: (
                  <Button
                    label="Eliminar"
                    isBusy={removeShopping.status.isBusy}
                    onClick={() => {
                      if (!business) return;

                      removeShopping.fetch(
                        { routeName: business?.routeName },
                        {
                          onAfterSuccess: () => {
                            onClose();
                            cart.onFetch();
                          },
                        },
                      );
                    }}
                  />
                ),
              };
            },
          },
          { emergent: true },
        );
      }}
      className={className}
    />
  );
};
