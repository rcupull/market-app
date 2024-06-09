import { Image, QueryHandle } from '../../types/general';
import fs from 'fs';
import { getAssetsDir, getAssetsImageDir } from '../../config';
import { deleteDirFilesUsingStartPattern, getFileNameToSave } from './utils';
import { logger } from '../logger';

const deleteOne: QueryHandle<{
  src: string;
}> = async ({ src }) => {
  const fullPath = `${getAssetsDir()}${src}`;

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        logger.error('Error deleting the image');
      }
    });
  }
};

const deleteDir: QueryHandle<{
  postId?: string;
  routeName?: string;
  userId: string;
}> = async ({ postId, routeName, userId }) => {
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
        logger.error('Error deleting the folder');
      }
    });
  }
};

const deleteOldImages: QueryHandle<{
  newImagesSrcs: Array<Image> | undefined;
  oldImagesSrcs: Array<Image> | undefined;
}> = async ({ newImagesSrcs = [], oldImagesSrcs = [] }) => {
  const imagesToRemove = oldImagesSrcs.filter(
    ({ src }) => !newImagesSrcs.map(({ src }) => src).includes(src)
  );

  imagesToRemove.forEach(({ src }) => {
    deleteOne({ src });
  });
};

const deleteManyImages: QueryHandle<{
  imagesUrls: Array<string> | undefined;
}> = async ({imagesUrls = []}) =>{
  imagesUrls.forEach((url) =>{
    deleteOne({src : url});
  });
}

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

  if (!filename) return;

  deleteDirFilesUsingStartPattern(filename, getAssetsImageDir());
};

export const imagesServices = {
  deleteOne,
  deleteOldImages,
  deleteDir,
  deleteImagesBy,
  deleteManyImages,
};
