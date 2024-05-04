import { useState } from 'react';

import { IconButton } from 'components/icon-button';

import { useUpdateAddOneShopping } from 'features/api/shopping/useUpdateAddOneShopping';

import { useDebouncer } from 'hooks/useDebouncer';

import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';

export interface ButtonPostToCartProps extends StyleProps {
  post: Post;
}

export const ButtonPostToCart = ({ post, className }: ButtonPostToCartProps) => {
  const [count, setCount] = useState<number>(0);
  const { stockAmount } = post;

  const { updateAddOneShopping } = useUpdateAddOneShopping();
  const shopping = useShopping();
  const { business } = useBusiness();

  const debouncer = useDebouncer();

  if (stockAmount === 0) {
    /**
     * Can not show the car because has not products in stock
     */
    return <></>;
  }

  return (
    <IconButton
      title="Adicionar el carrito"
      svg={<SvgShoppingCartSolid className="!size-8 !fill-gray-500" />}
      isBusy={updateAddOneShopping.status.isBusy}
      onClick={(e) => {
        e.preventDefault();

        const amountToAdd = count + 1;
        setCount(amountToAdd);

        debouncer(() => {
          setCount(0);
          if (!business) return;

          updateAddOneShopping.fetch(
            { postId: post._id, amountToAdd, routeName: business.routeName },
            {
              onAfterSuccess: () => {
                shopping.onFetch({ routeName: business.routeName });
              },
            },
          );
        }, 500);
      }}
      className={className}
    />
  );
};
