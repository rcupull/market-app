import { Amount } from 'components/amount';
import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ClothingSizeGroup } from 'components/clothing-size-group';
import { ColorCircleGroup } from 'components/color-circle-group';
import { EmptyImage } from 'components/empty-image';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveShopping } from 'features/api/shopping/useRemoveShopping';
import { useUpdateAddOneShopping } from 'features/api/shopping/useUpdateAddOneShopping';
import { useModal } from 'features/modal/useModal';

import { IconButtonViewPostPage } from './IconButtonViewPostPage';

import { useCart } from 'pages/@hooks/useCart';
import { ShoppingPostMeta } from 'types/shopping';
import { getImageEndpoint } from 'utils/api';

export interface PostAddedProps {
  routeName: string;
  shoppingPostMeta: ShoppingPostMeta;
}

export const PostAdded = ({ shoppingPostMeta, routeName }: PostAddedProps) => {
  const { updateAddOneShopping } = useUpdateAddOneShopping();

  const { count, postData, purshaseNotes } = shoppingPostMeta;
  const { name, images, _id: postId } = postData;
  const cart = useCart();

  const { interestedByClothingSizes, interestedByColors } = purshaseNotes || {};

  const mainImage = images?.[0];
  const { pushModal } = useModal();

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-md p-1 gap-1">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          {mainImage ? (
            <img src={getImageEndpoint(mainImage.src)} className="w-8" />
          ) : (
            <EmptyImage className="size-8" />
          )}
        </div>

        {name}
      </div>

      {(!!interestedByColors?.length || !!interestedByClothingSizes?.length) && (
        <div className="flex items-center flex-wrap justify-center gap-6 w-full my-2">
          <ColorCircleGroup value={interestedByColors} size="small" />
          <ClothingSizeGroup value={interestedByClothingSizes} />
        </div>
      )}

      <div className="flex items-center">
        <Amount
          value={count}
          isBusy={updateAddOneShopping.status.isBusy}
          onChange={(amount) => {
            updateAddOneShopping.fetch(
              { postId, routeName, amountToAdd: amount - count },
              {
                onAfterSuccess: () => {
                  cart.onFetch();
                }
              }
            );
          }}
        />

        <IconButtonRemove
          stopPropagation
          title="Eliminar articulo"
          onClick={() => {
            pushModal('Confirmation', {
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
                          { postId, routeName, purshaseNotes },
                          {
                            onAfterSuccess: () => {
                              onClose();
                              cart.onFetch();
                            }
                          }
                        );
                      }}
                    />
                  )
                };
              }
            });
          }}
        />

        <IconButtonViewPostPage postId={postId} routeName={routeName} />
      </div>
    </div>
  );
};
