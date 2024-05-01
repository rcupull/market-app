import { Request } from "express";
import { getAssetsImageDir } from "../../config";

export const getDirPathNameToUpload = ({
  req,
}: {
  req: Request;
}): string | null => {
  const { file, query } = req;
  const { routeName, postId, userId } = query;

  if (postId && !routeName) {
    console.log("no routeName");
    return null;
  }

  let dirPathName = `${getAssetsImageDir()}/${userId}/`;

  if (routeName) {
    dirPathName = `${dirPathName}${routeName}/`;
  }

  if (postId) {
    dirPathName = `${dirPathName}${postId}/`;
  }

  return dirPathName;
};
