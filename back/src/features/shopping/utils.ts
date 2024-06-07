import { Shopping } from '../../types/shopping';
import { logger } from '../logger';

export const getDebitFromOrder = ({
  order,
}: {
  order: Shopping;
}): {
  debit: number;
} => {
  const orderMoney = order.posts.reduce((amount, { count, post }) => {
    if (!post.price) {
      return amount;
    }

    if (post.currency !== 'CUP') {
      logger.info('not cup'); //TODO not cup
      return amount;
    }

    return amount + post.price * count; //TODO agregar conversion de moneda su es USD
  }, 0);

  const moneyToPay = orderMoney * 0.01; //el 1% de las ventas es de la app

  return {
    debit: moneyToPay,
  };
};
