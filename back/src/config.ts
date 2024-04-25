import { join } from "path";

export const getAssetsDir = () => {
  return join(process.cwd(), `../assets`);
};

export const getAssetsImageDir = () => {
  return `${getAssetsDir()}/app-images`;
};

export const appAssets = ["/app-images"];
