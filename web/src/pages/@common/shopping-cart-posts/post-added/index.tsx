import { Amount } from 'components/amount';
import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { EmptyImage } from 'components/empty-image';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveShopping } from 'features/api/shopping/useRemoveShopping';
import { useUpdateAddOneShopping } from 'features/api/shopping/useUpdateAddOneShopping';
import { useModal } from 'features/modal/useModal';

import { IconButtonViewPostPage } from './IconButtonViewPostPage';

import { useCart } from 'pages/@hooks/useCart';
import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface PostAddedProps {
  count: number;
  postId: string;
  postImages?: Array<Image>;
  postName: string;
  routeName: string;
}

export const PostAdded = ({ count, postId, postImages, postName, routeName }: PostAddedProps) => {
  const { updateAddOneShopping } = useUpdateAddOneShopping();
  const cart = useCart();

  const mainImage = postImages?.[0];
  const { pushModal } = useModal();

  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-300 rounded-md p-1 gap-1">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          {mainImage ? (
            <img src={getImageEndpoint(mainImage.src)} className="w-8" />
          ) : (
            <EmptyImage className="size-8" />
          )}
        </div>

        {postName}
      </div>

      <div className="flex items-center sm:ml-auto">
        <Amount
          value={count}
          isBusy={updateAddOneShopping.status.isBusy}
          onChange={(amount) => {
            updateAddOneShopping.fetch(
              { postId, routeName, amountToAdd: amount - count },
              {
                onAfterSuccess: () => {
                  cart.onFetch();
                },
              }
            );
          }}
        />

        <IconButtonRemove
          stopPropagation
          title="Eliminar articulo"
          onClick={() => {
            pushModal(
              'Confirmation',
              {
                useProps: () => {
                  const { onClose } = useModal();
                  const { removeShopping } = useRemoveShopping();

                  return {
                    content: '¿Seguro que desea quitar este producto del carro de compras?',
                    badge: <Badge variant="error" />,
                    primaryBtn: (
                      <Button
                        label="Eliminar artículo"
                        isBusy={removeShopping.status.isBusy}
                        onClick={() => {
                          removeShopping.fetch(
                            { postId, routeName },
                            {
                              onAfterSuccess: () => {
                                onClose();
                                cart.onFetch();
                              },
                            }
                          );
                        }}
                      />
                    ),
                  };
                },
              },
              { emergent: true }
            );
          }}
        />

        <IconButtonViewPostPage postId={postId} routeName={routeName} />
      </div>
    </div>
  );
};
