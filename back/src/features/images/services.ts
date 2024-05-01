import { Image, QueryHandle } from "../../types/general";
import fs from "fs";
import { get400Response } from "../../utils/server-response";
import { getAssetsDir, getAssetsImageDir } from "../../config";
import { deleteDirFilesUsingStartPattern, getFileNameToSave } from "./utils";

const deleteOne: QueryHandle<{
  src: string;
}> = async ({ src, res }) => {
  const fullPath = `${getAssetsDir()}${src}`;

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        return get400Response({
          res,
          json: { message: "Error deleting the image" },
        });
      }
    });
  }
};

const deleteDir: QueryHandle<{
  postId?: string;
  routeName?: string;
  userId: string;
}> = async ({ postId, routeName, userId, res }) => {
  let path = `${getAssetsImageDir()}/${userId}/`;

  if (routeName) {
    path = `${path}${routeName}/`;
  }

  if (postId) {
    path = `${path}${postId}/`;
  }

  if (fs.existsSync(path)) {
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) {
        return get400Response({
          res,
          json: {
            message: "Error deleting the folder",
          },
        });
      }
    });
  }
};

const deleteOldImages: QueryHandle<{
  newImagesSrcs: Array<Image> | undefined;
  oldImagesSrcs: Array<Image> | undefined;
}> = async ({ newImagesSrcs = [], oldImagesSrcs = [], res, req }) => {
  const imagesToRemove = oldImagesSrcs.filter(
    ({ src }) => !newImagesSrcs.map(({ src }) => src).includes(src)
  );

  imagesToRemove.forEach(({ src }) => {
    deleteOne({ src, res, req });
  });
};

const deleteImagesBy: QueryHandle<{
  routeName?: string;
  postId?: string;
  userId: string;
}> = async ({ routeName, postId, userId }) => {
  const filename = getFileNameToSave({
    userId,
    postId,
    routeName,
  });

  console.log("filename", filename);
  if (!filename) return;

  deleteDirFilesUsingStartPattern(filename, getAssetsImageDir());
};

export const imagesServices = {
  deleteOne,
  deleteOldImages,
  deleteDir,
  deleteImagesBy,
};
