import { cloudFlareApiToken } from '../../config';
import { Image, QueryHandle } from '../../types/general';

import { CloudflareCDNListResponse, CloudflareCDNUploadResponse } from './types';
import { getRandomHash } from '../../utils/general';
import { cloudflareBaseUrl, getFileNameToSave, getCloudFlareImageIdFromUrl } from './utils';
import { axios } from '../../utils/api';

export const imagesServicesUploadFile: QueryHandle<
  {
    file: Express.Multer.File;
    routeName?: string;
    postId?: string;
    userId?: string;
  },
  CloudflareCDNUploadResponse | null
> = async ({ file, postId, routeName, userId }) => {
  const fileName = getFileNameToSave({
    userId,
    postId,
    routeName,
  });

  if (!fileName) {
    return null;
  }

  const formData = new FormData();

  const blobData = new Blob([file.buffer]);

  formData.append('file', blobData, file.originalname);
  formData.append('id', `${fileName}/${getRandomHash().slice(-6)}`);

  const response = await axios({
    method: 'post',
    url: cloudflareBaseUrl,
    headers: {
      Authorization: `Bearer ${cloudFlareApiToken}`,
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  const out: CloudflareCDNUploadResponse = response.data;

  return out;
};

export const imagesServicesGetAll: QueryHandle<void, CloudflareCDNListResponse> = async () => {
  const axiosResponse = await axios({
    method: 'get',
    url: cloudflareBaseUrl,
    headers: {
      Authorization: `Bearer ${cloudFlareApiToken}`,
    },
  });

  const out: CloudflareCDNListResponse = axiosResponse.data;

  return out;
};

/**
 *
 * @param src can be the full url or the id of the image
 */
export const imagesServicesDeleteOne: QueryHandle<{ src: string }> = async ({ src }) => {
  const id = getCloudFlareImageIdFromUrl(src);

  if (!id) return;

  await axios({
    method: 'delete',
    url: `${cloudflareBaseUrl}/${id}`,
    headers: {
      Authorization: `Bearer ${cloudFlareApiToken}`,
    },
  });
};

/**
 *
 * @param srcs can be an array of the full url or the id of the image
 */

export const imagesServicesDeleteMany: QueryHandle<{ srcs: Array<string> }> = async ({ srcs }) => {
  const promises = srcs.map((src) => imagesServicesDeleteOne({ src }));
  await Promise.all(promises);
};

export const imagesServicesDeleteBulk: QueryHandle<{
  routeName?: string;
  postId?: string;
  userId: string;
}> = async ({ routeName, postId, userId }) => {
  const allImages = await imagesServicesGetAll();

  const filename = getFileNameToSave({
    userId,
    postId,
    routeName,
  });

  const imagesToRemove = allImages.result.images.filter(({ id }) => id.startsWith(`${filename}/`));

  if (imagesToRemove.length) {
    await imagesServicesDeleteMany({ srcs: imagesToRemove.map(({ id }) => id) });
  }
};

export const imagesServicesDeleteOldImages: QueryHandle<{
  newImagesSrcs: Array<Image> | undefined;
  oldImagesSrcs: Array<Image> | undefined;
}> = async ({ newImagesSrcs = [], oldImagesSrcs = [] }) => {
  const imagesToRemove = oldImagesSrcs.filter(
    ({ src }) => !newImagesSrcs.map(({ src }) => src).includes(src)
  );

  if (imagesToRemove.length) {
    await imagesServicesDeleteMany({ srcs: imagesToRemove.map(({ src }) => src) });
  }
};
