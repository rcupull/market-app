import TelegramBot from 'node-telegram-bot-api';
import { telegram_token_bot } from '../../config';
import { ValidationCodeModel } from '../../schemas/auth';
import { TelegramBotChat } from '../../types/business';
import { getRandomHash } from '../../utils/general';
import { logger } from '../logger';
import { agendaHandles } from '../agenda/handles';

let bot: TelegramBot;

export const telegramServices = {
  sendMessage: (chatId: number, message: string) => {
    bot.sendMessage(chatId, message);
  },
  init: () => {
    bot = new TelegramBot(telegram_token_bot, { polling: true });

    bot.onText(/\/start/, async (msg) => {
      const code = getRandomHash().slice(-6);
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

    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Procesando su mensaje');
    });
  },
};
