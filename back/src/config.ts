import { join } from "path";
const appConfig = require("../../app-config.js");

export const serviceAccount = appConfig.googleApplicationCredentials;
export const dbUrl = appConfig.dbUrl;
export const secretAccessToken = appConfig.secretAccessToken;
export const secretRefreshToken = appConfig.secretRefreshToken;
export const appAssetsDir = appConfig.appAssetsDir;
export const appFrontDir = appConfig.appFrontDir;
export const hostname = appConfig.hostname;
export const enabledWhatsapp = appConfig.enabledWhatsapp;

export const getAssetsDir = () => {
  return join(process.cwd(), appAssetsDir);
};

export const getAssetsImageDir = () => {
  return `${getAssetsDir()}/app-images`;
};
