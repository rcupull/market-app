import { isNumber } from './general';

import { Shopping, ShoppingState } from 'types/shopping';

export const getShoppingData = (
  shopping: Shopping
): {
  totalProducts: number;
  totalPrice: number;
} => {
  const { posts } = shopping;

  let totalProducts = 0;
  let totalPrice = 0;

  posts.forEach(({ count, postData }) => {
    if (!isNumber(postData.price)) {
      console.log('not price number');
      return;
    }

    totalProducts = totalProducts + count;
    totalPrice = totalPrice + postData.price * count; //TODO add conversion if the currency is not USD
  });

  return {
    totalProducts,
    totalPrice,
  };
};

export const getShoppingStateLabel = (state: ShoppingState): string => {
  const labels: Record<ShoppingState, string> = {
    CONSTRUCTION: 'En construcción', //this state is temporaly and can not handle by the user
    REQUESTED: 'Solicitado',
    CANCELED: 'Cancelado',
    REJECTED: 'Rechazado',
    PROCESSING: 'En proceso',
    DELIVERED: 'Entregado',
    // READY_TO_DELIVER: 'Listo para entregar',
    APPROVED: 'Aceptado',
  };

  return labels[state];
};

/**
 * Return tru if the shopping is or was approved
 */
export const wasApprovedShopping = (shopping: Shopping): boolean => {
  const { state, history } = shopping;

  return state === 'APPROVED' || !!history?.find(({ state }) => state === 'APPROVED');
};
