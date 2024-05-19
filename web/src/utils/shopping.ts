import { isNumber } from './general';

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

    if (!isNumber(post.price)) {
      console.log('not price number');
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
    CONSTRUCTION: 'En construcción', //this state is temporaly and can not handle by the user
    REQUESTED: 'Solicitada',
    DELIVERED: 'Entregada',
    CANCELED: 'Cancelada',
    REJECTED: 'Rechazada',
  };

  return labels[state];
};
