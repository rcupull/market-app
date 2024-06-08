import { Business } from '../../types/business';
import { Shopping } from '../../types/shopping';
import { logger } from '../logger';
import { telegramServices } from './services';

export const sendNewOrderTelegramMessage = ({
  business,
  order,
}: {
  business: Business;
  order: Shopping;
}) => {
  try {
    const { telegramBotChat, name } = business;
    const { _id } = order;

    if (!telegramBotChat) {
      return logger.warn(`the business ${business.name} has not a activated telegram account`);
    }

    const { chatId } = telegramBotChat;

    telegramServices.sendMessage(
      chatId,
      `Una nueva orden de compra ha sido generada en su negocio "${name}" de nuestra plataforma Asere Market. Puede ver los detalles en la sección de órdenes de compras.`
    );
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};
