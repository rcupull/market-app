import { join } from "path";

const APP_CONFIG_PATH = process.env.APP_CONFIG_PATH || "";
const appConfig = require(join(process.cwd(), APP_CONFIG_PATH));

export const serviceAccount = appConfig.googleApplicationCredentials;
export const dbUrl = appConfig.dbUrl;
export const secretAccessToken = appConfig.secretAccessToken;
export const appAssetsDir = appConfig.appAssetsDir;
export const appFrontDir = appConfig.appFrontDir;
export const apiPort = appConfig.apiPort;

export const getAssetsDir = () => {
  return join(process.cwd(), appAssetsDir);
};

export const getAssetsImageDir = () => {
  return `${getAssetsDir()}/app-images`;
};
