import { Amount } from 'components/amount';
import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { EmptyImage } from 'components/empty-image';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveShopping } from 'features/api/shopping/useRemoveShopping';
import { useUpdateAddOneShopping } from 'features/api/shopping/useUpdateAddOneShopping';
import { useModal } from 'features/modal/useModal';

import { IconButtonViewPostPage } from './IconButtonViewPostPage';

import { useShopping } from 'pages/@hooks/useShopping';
import { Post } from 'types/post';
import { ShoppingPostData } from 'types/shopping';

export interface PostAddedProps {
  count: number;
  post: Post | ShoppingPostData;
}

export const PostAdded = ({ count, post }: PostAddedProps) => {
  const { updateAddOneShopping } = useUpdateAddOneShopping();
  const shopping = useShopping();

  const { name, images, _id, routeName } = post;
  const mainImage = images?.[0];
  const { pushModal } = useModal();

  return (
    <div className="flex items-center border border-gray-300 rounded-md p-1 gap-1">
      <div className="flex-shrink-0">
        {mainImage ? <img src={mainImage.src} className="w-8" /> : <EmptyImage className="w-8" />}
      </div>

      {name}

      <div className="ml-auto" />

      <IconButtonViewPostPage post={post} />

      <Amount
        value={count}
        isBusy={updateAddOneShopping.status.isBusy}
        onChange={(amount) => {
          updateAddOneShopping.fetch(
            { postId: _id, routeName, amountToAdd: amount - count },
            {
              onAfterSuccess: () => {
                shopping.onFetch({ routeName });
              },
            },
          );
        }}
      />

      <img />
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
                          { postId: _id, routeName },
                          {
                            onAfterSuccess: () => {
                              onClose();
                              shopping.onFetch({ routeName });
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
      />
    </div>
  );
};
