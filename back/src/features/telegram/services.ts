import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { telegram_token_bot } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';
import { getRandomHash } from '../../utils/general';
import { logger } from '../logger';
import { QueryHandle, TelegramBotChat } from '../../types/general';
import { agendaServices } from '../agenda/services';
import { Shopping } from '../../types/shopping';
import { getBusinessOrdersTagUrl, getShoppingUrl } from '../../utils/web';

/**
 * https://core.telegram.org/bots/api#html-style
 * https://core.telegram.org/bots/api#formatting-options
 * class="tg-spoiler"
 */

let bot: TelegramBot;

export const telegramServicesInit = () => {
  bot = new TelegramBot(telegram_token_bot, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    const code = getRandomHash().slice(-4);

    const { id, first_name, username } = msg.chat;

    const meta: TelegramBotChat = {
      chatId: id,
      firstName: first_name,
      userName: username,
    };

    logger.info(`Telegram: new chat: ${JSON.stringify(meta)}`);
    const validationCode = new ValidationCodeModel({
      code,
      meta,
    });

    await validationCode.save();

    /**
     * Remove validation code in 60 seconds if still exists
     */
    await agendaServices.scheduleRemoveValidationCode({ code, timeout: 300 });

    bot.sendMessage(
      meta.chatId,
      `Tiene 5 minutos para usar el siguiente código de activación: ${code}.`,
    );
  });

  bot.onText(/\/test/, async (msg) => {
    const { id, first_name, username } = msg.chat;

    const meta: TelegramBotChat = {
      chatId: id,
      firstName: first_name,
      userName: username,
    };

    bot.sendMessage(meta.chatId, `<a href='https://www.aseremarket.net'>Asere Market</a>`, {
      parse_mode: 'HTML',
    });

    bot.sendMessage(
      meta.chatId,
      `<a href='https://aseremarket.net/b/maria-s-garage/shopping/668883f4cb37e3248c4d46da'>Camisetas de niños</a>`,
      {
        parse_mode: 'HTML',
      },
    );
    bot.sendMessage(
      meta.chatId,
      `<a href='${getBusinessOrdersTagUrl({ routeName: 'maria-s-garage' })}'>aquí</a>.`,
      {
        parse_mode: 'HTML',
      },
    );
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Procesando su mensaje');
  });
};

export const telegramServicesSendMessage: QueryHandle<{
  chatId: number;
  message: string;
  options?: SendMessageOptions;
}> = async ({ chatId, message, options }) => {
  try {
    bot.sendMessage(chatId, message, options);
  } catch (e) {
    logger.error('Error sending telegram message');
    logger.error(e);
  }
};

export const telegramServicesSendNewOrderApprovedMessage: QueryHandle<{
  chatId: number;
  businessName: string;
  shopping: Shopping;
}> = async ({ chatId, shopping, businessName }) => {
  /**
   * este mensaje es enviado para el cliente cuando se apruebe una nueva orden
   */
  telegramServicesSendMessage({
    chatId,
    message: `Una orden de compra generada por usted en el negocio <b>${businessName}</b> ha sido aprovada. Usted será contactado luego por el vendedor para los detalles de la entrega.`,
    options: {
      parse_mode: 'HTML',
    },
  });

  const shoppingLink = getShoppingUrl({
    routeName: shopping.routeName,
    shoppingId: shopping._id.toString(),
  });

  telegramServicesSendMessage({
    chatId,
    message: `<a href='${shoppingLink}'>Ver detalles de la orden de compra</a>`,
    options: {
      parse_mode: 'HTML',
    },
  });
};
