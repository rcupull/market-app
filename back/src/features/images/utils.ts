import { getAssetsImageDir } from "../../config";
import fs from "fs";
import { join, resolve } from "path";

export const getFullFileNameToSave = (args: {
  routeName?: string;
  postId?: string;
  userId?: string;
}): string | null => {
  const filename = getFileNameToSave(args);

  if (!filename) return filename;

  return `${getAssetsImageDir()}/${filename}`;
};

export const getFileNameToSave = (args: {
  routeName?: string;
  postId?: string;
  userId?: string;
}): string | null => {
  const { routeName, postId, userId } = args;

  if (!userId) {
    console.log("no userId found");
    return null;
  }

  if (postId && !routeName) {
    console.log("no routeName found");
    return null;
  }

  let filename = userId;

  if (routeName) {
    filename = `${filename}-${routeName}`;
  }

  if (postId) {
    filename = `${filename}-${postId}`;
  }

  return filename;
};

export const deleteDirFilesUsingStartPattern = (
  start: string,
  dirPath: string
) => {
  fs.readdir(resolve(dirPath), (err, fileNames) => {
    if (err) throw err;

    for (const name of fileNames) {
      if (name.startsWith(start)) {
        fs.unlink(join(dirPath, name), (err) => {
          if (err) throw err;
        });
      }
    }
  });
};
