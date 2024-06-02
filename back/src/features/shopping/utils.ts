import { Shopping } from '../../types/shopping';
import { logger } from '../logger';

export const computePay = ({
  order,
  currentCredit,
}: {
  order: Shopping;
  currentCredit: number;
}): {
  fromCredit: number;
  toPay: number;
  newCredit: number;
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

  if (moneyToPay > currentCredit) {
    return {
      fromCredit: currentCredit,
      toPay: moneyToPay - currentCredit,
      newCredit: 0,
    };
  }

  return {
    fromCredit: moneyToPay,
    toPay: 0,
    newCredit: currentCredit - moneyToPay,
  };
};
