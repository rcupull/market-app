import { Shopping, ShoppingState } from 'types/shopping';

export const getShoppingData = (
  shopping: Shopping,
): {
  totalProducts: number;
  totalPrice: number;
} => {
  const { posts } = shopping;

  let totalProducts = 0;
  let totalPrice = 0;

  posts.forEach(({ count, post }) => {
    if (post.currency !== 'CUP') {
      console.log('not cup'); //TODO not cup
      return;
    }

    totalProducts = totalProducts + count;
    totalPrice = totalPrice + post.price * count; //TODO add conversion if the currency is not USD
  });

  return {
    totalProducts,
    totalPrice,
  };
};

export const getShoppingStateLabel = (state: ShoppingState): string => {
  const labels: Record<ShoppingState, string> = {
    CONSTRUCTION: 'En construcción',
    REQUESTED: 'Solicitado',
    DELIVERED: 'Entregado',
    CANCELED: 'Cancelado',
  };

  return labels[state];
};
