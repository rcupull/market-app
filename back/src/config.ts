import { join } from 'path';
//eslint-disable-next-line
const appConfig = require('../../app-config.js');

export const serviceAccount = appConfig.googleApplicationCredentials;
export const dbUrl = appConfig.dbUrl;
export const secretAccessToken = appConfig.secretAccessToken;
export const secretRefreshToken = appConfig.secretRefreshToken;
export const secretAgendaToken = appConfig.secretAgendaToken;

export const appAssetsDir = appConfig.appAssetsDir;
export const appFrontDir = appConfig.appFrontDir;
export const hostname = appConfig.hostname;
export const appUploadedFilesDir = appConfig.appUploadedFilesDir;

export const cloudFlareAccountId = appConfig.cloudFlareAccountId;
export const cloudFlareApiToken = appConfig.cloudFlareApiToken;
export const cloudFlareAccountHash = appConfig.cloudFlareAccountHash;
export const geoapifyApikey = appConfig.geoapifyApikey;

export const getAssetsDir = () => {
  return join(process.cwd(), appAssetsDir);
};

export const getAssetsImageDir = () => {
  return `${getAssetsDir()}/app-images`;
};
