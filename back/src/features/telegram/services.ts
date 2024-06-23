import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { telegram_token_bot } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';
import { getRandomHash } from '../../utils/general';
import { logger } from '../logger';
import { agendaHandles } from '../agenda/handles';
import { TelegramBotChat } from '../../types/general';
import { notificationsServices } from '../notifications/services';

/**
 * https://core.telegram.org/bots/api#html-style
 * https://core.telegram.org/bots/api#formatting-options
 * class="tg-spoiler"
 */

let bot: TelegramBot;

export const telegramServices = {
  sendMessage: (chatId: number, message: string, options?: SendMessageOptions) => {
    bot.sendMessage(chatId, message, options);
  },
  init: () => {
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
      agendaHandles.removeValidationCode({ code, timeout: 60 });

      bot.sendMessage(
        meta.chatId,
        `Tiene 60 segundos para usar el siguiente código de activación: ${code}.`,
      );
    });

    bot.onText(/\/test/, async () => {
      // const { id, first_name, username } = msg.chat;

      // const meta: TelegramBotChat = {
      //   chatId: id,
      //   firstName: first_name,
      //   userName: username,
      // };

      // bot.sendMessage(meta.chatId, `<a href='https://www.aseremarket.net'>some link</a>`, {
      //   parse_mode: 'HTML',
      // });

      notificationsServices.sendTestNativeNotification({ title: 'title', body: 'Prueba' });
    });

    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Procesando su mensaje');
    });
  },
};
