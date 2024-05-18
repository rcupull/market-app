import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { logger } from "../logger";

/**
 * https://wwebjs.dev/guide/creating-your-bot/#listening-for-messages
 */
let whatsapp: Client;

export const whatsappServices = {
  init: () => {
    whatsapp = new Client({
      authStrategy: new LocalAuth(),
      webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
    });

    whatsapp.once("ready", () => {
      logger.info("Whatsapp client is ready!");
    });

    whatsapp.on("disconnected", (reason) => {
      logger.info("Client is disconnected");
      logger.info(reason);

      whatsapp.initialize().then();
    });

    whatsapp.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    whatsapp.initialize();
  },
  sendMessage: (phoneNumber: string, text: string) => {
    logger.info(`Sending whatsapp message to ${phoneNumber}: ${text}`);

    whatsapp.sendMessage(`${phoneNumber}@c.us`, text);
  },
};
