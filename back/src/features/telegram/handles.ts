import { Business, BusinessNotificationFlags } from '../../types/business';
import { Shopping } from '../../types/shopping';
import { logger } from '../logger';
import { telegramServices } from './services';

export const sendNewOrderTelegramMessage = ({
  business,
  //eslint-disable-next-line
  shopping,
}: {
  business: Business;
  shopping: Shopping;
}) => {
  if (!business.notificationFlags?.includes(BusinessNotificationFlags.TELEGRAM_NEW_SHOPPING)) {
    return;
  }

  try {
    const { telegramBotChat, name } = business;

    if (!telegramBotChat) {
      return logger.warn(`the business ${business.name} has not a activated telegram account`);
    }

    const { chatId } = telegramBotChat;

    telegramServices.sendMessage(
      chatId,
      `Una nueva orden de compra ha sido generada en su negocio "${name}" de nuestra plataforma Asere Market. Puede ver los detalles en la sección de órdenes de compras.`,
    );
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};
