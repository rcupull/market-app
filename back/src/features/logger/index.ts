import { createLogger, transports, format } from "winston";

import fs from "fs";
const { combine, timestamp, label, printf, colorize } = format;

if (!fs.existsSync("./logs")) {
  fs.mkdirSync("./logs");
}

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} [${level}]: ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      label({ label: "dev" }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.Console(), // ONLY PRINTING LOGS IN TERMINAL
    ],
  });
};

const productionsLogger = () => {
  return createLogger({
    level: "info",
    transports: [
      new transports.File({
        filename: "./logs/info-logs.log",
        level: "info",
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: "./logs/error-logs.log",
        level: "error",
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });
};

const isProduction = process.env.NODE_ENV === "production";
export const logger = isProduction ? productionsLogger() : devLogger();
