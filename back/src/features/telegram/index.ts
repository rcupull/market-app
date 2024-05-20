import TelegramBot from "node-telegram-bot-api";
import { telegram_token_bot } from "../../config";
import { ValidationCodeModel } from "../../schemas/auth";
import { v4 as uuid } from "uuid";
import { TelegramBotChat } from "../../types/business";
import { getRandomHash } from "../../utils/general";

let bot: TelegramBot;

export const telegramServices = {
  sendMessage: (chatId: number, message: string) => {
    bot.sendMessage(chatId, message);
  },
  init: () => {
    bot = new TelegramBot(telegram_token_bot, { polling: true });

    bot.onText(/\/start/, async (msg, match) => {
      const code = getRandomHash().slice(-6);
      const { id, first_name, username } = msg.chat;

      const meta: TelegramBotChat = {
        chatId: id,
        firstName: first_name,
        userName: username,
      };

      const validationCode = new ValidationCodeModel({
        code,
        meta,
      });

      await validationCode.save();

      bot.sendMessage(
        meta.chatId,
        `Use el siguiente código de activación ${code}`
      );
    });

    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Procesando su mensaje");
    });
  },
};
