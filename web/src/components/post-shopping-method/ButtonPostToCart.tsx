import { useState } from 'react';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';

import { useUpdateAddOneShopping } from 'features/api/shopping/useUpdateAddOneShopping';
import { useAuth } from 'features/api-slices/useAuth';

import { useDebouncer } from 'hooks/useDebouncer';

import SvgShoppingCartSolid from 'icons/ShoppingCartSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { StyleProps } from 'types/general';
import { Post, PostPurshaseNotes } from 'types/post';

export interface ButtonPostToCartProps extends StyleProps {
  post: Post;
  purshaseNotes?: PostPurshaseNotes;
  variant?: 'icon' | 'button';
}

export const ButtonPostToCart = ({
  post,
  className,
  variant = 'icon',
  purshaseNotes,
}: ButtonPostToCartProps) => {
  const [count, setCount] = useState<number>(0);
  const { stockAmountAvailable } = post;
  const { isAuthenticated } = useAuth();
  const authSignInModal = useAuthSignInModal();

  const { updateAddOneShopping } = useUpdateAddOneShopping();
  const shopping = useShopping();
  const { business } = useBusiness();

  const debouncer = useDebouncer();

  if (stockAmountAvailable === 0) {
    /**
     * Can not show the car because has not products in stock
     */

    return (
      <IconButton
        title="Agotados"
        preventDefault
        svg={<SvgShoppingCartSolid className="!size-8 !fill-red-500 !cursor-not-allowed" />}
        className={className}
      />
    );
  }

  const handleCall = () => {
    if (!isAuthenticated) {
      return authSignInModal.open({ redirect: false });
    }

    const amountToAdd = count + 1;
    setCount(amountToAdd);

    debouncer(() => {
      setCount(0);
      if (!business) return;

      updateAddOneShopping.fetch(
        { postId: post._id, amountToAdd, routeName: business.routeName, purshaseNotes },
        {
          onAfterSuccess: () => {
            shopping.onFetch({ routeName: business.routeName });
          },
        }
      );
    }, 500);
  };

  if (variant === 'button') {
    return (
      <Button
        label="Adicionar el carrito"
        svg={SvgShoppingCartSolid}
        isBusy={updateAddOneShopping.status.isBusy}
        onClick={(e) => {
          e.preventDefault();

          handleCall();
        }}
        className={className}
      />
    );
  }

  if (variant === 'icon') {
    return (
      <IconButton
        title="Adicionar el carrito"
        svg={<SvgShoppingCartSolid className="!size-8 !fill-gray-500" />}
        isBusy={updateAddOneShopping.status.isBusy}
        onClick={(e) => {
          e.preventDefault();

          handleCall();
        }}
        className={className}
      />
    );
  }

  return <></>;
};
