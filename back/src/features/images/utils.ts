import { cloudFlareAccountHash, cloudFlareAccountId } from '../../config';
import { logger } from '../logger';

export const cloudflareBaseUrl = `https://api.cloudflare.com/client/v4/accounts/${cloudFlareAccountId}/images/v1`;
export const cloudflareDeliveryUrl = `https://imagedelivery.net/${cloudFlareAccountHash}`;

export const cloudflareImageVariants = {
  public: 'public',
};

export const getCloudFlareImageIdFromUrl = (url: string): string | null => {
  if (url.startsWith('http') && !url.includes(cloudflareDeliveryUrl)) {
    return null;
  }

  let out = url.replace(`${cloudflareDeliveryUrl}/`, '');

  Object.keys(cloudflareImageVariants).forEach((variant) => {
    if (out.endsWith(`/${variant}`)) {
      out = out.replace(`/${variant}`, '');
    }
  });

  return out;
};

export const getFileNameToSave = (args: {
  routeName?: string;
  postId?: string;
  userId?: string;
}): string | null => {
  const { routeName, postId, userId } = args;

  if (!userId) {
    logger.info('no userId found');
    return null;
  }

  if (postId && !routeName) {
    logger.info('no routeName found');
    return null;
  }

  let filename = `${userId}`;

  if (process.env.NODE_ENV === 'development') {
    filename = `development/${filename}`;
  }

  if (routeName) {
    filename = `${filename}/${routeName}`;
  }

  if (postId) {
    filename = `${filename}/${postId}`;
  }

  return filename;
};
