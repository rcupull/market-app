import { cloudFlareAccountId, cloudFlareApiToken } from '../../config';
import { Image } from '../../types/general';
import { mockAxios } from '../../utils/test-mocks/mockApiClients';
import {
  mockImagesServicesDeleteMany,
  mockImagesServicesDeleteOne
} from '../../utils/test-mocks/mockImagesServices';
import {
  imagesServicesDeleteMany,
  imagesServicesDeleteOldImages,
  imagesServicesDeleteOne
} from './services';
import { cloudflareDeliveryUrl } from './utils';

describe('services', () => {
  describe('imagesServicesDeleteOne', () => {
    it('should call axios with right params when call to remove with image url', async () => {
      const { axios } = mockAxios();

      await imagesServicesDeleteOne({ src: `${cloudflareDeliveryUrl}/imageId/public` });

      expect(axios).toHaveBeenCalledWith({
        headers: {
          Authorization: `Bearer ${cloudFlareApiToken}`
        },
        method: 'delete',
        url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareAccountId}/images/v1/imageId`
      });
    });

    it('should call axios with right params when call to remove with image id', async () => {
      const { axios } = mockAxios();

      await imagesServicesDeleteOne({ src: 'imageId' });

      expect(axios).toHaveBeenCalledWith({
        headers: {
          Authorization: `Bearer ${cloudFlareApiToken}`
        },
        method: 'delete',
        url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareAccountId}/images/v1/imageId`
      });
    });

    it('should call axios with right params when call to remove with not cloudflare url', async () => {
      const { axios } = mockAxios();

      await imagesServicesDeleteOne({ src: 'https://someimage,com' });

      expect(axios).toHaveBeenCalledTimes(0); //no call ti remove when the image is extern
    });
  });

  describe('imagesServicesDeleteMany', () => {
    it('should call deleteOne with right params', async () => {
      const { imagesServicesDeleteOne } = mockImagesServicesDeleteOne();

      const srcs = [
        `${cloudflareDeliveryUrl}/imageId1/public`,
        `${cloudflareDeliveryUrl}/imageId2/public`,
        `${cloudflareDeliveryUrl}/imageId3/public`
      ];

      await imagesServicesDeleteMany({ srcs });

      expect(imagesServicesDeleteOne).toHaveBeenCalledTimes(3);

      expect(imagesServicesDeleteOne).toHaveBeenCalledWith({ src: srcs[0] });
      expect(imagesServicesDeleteOne).toHaveBeenCalledWith({ src: srcs[1] });
      expect(imagesServicesDeleteOne).toHaveBeenCalledWith({ src: srcs[2] });
    });
  });

  describe('imagesServicesDeleteOldImages', () => {
    it('should call deleteMany with right params', async () => {
      const { imagesServicesDeleteMany } = mockImagesServicesDeleteMany();

      const oldImagesSrcs: Array<Image> = [
        {
          src: `${cloudflareDeliveryUrl}/imageId1/public`,
          height: 0,
          width: 0
        },
        {
          src: `${cloudflareDeliveryUrl}/imageId2/public`,
          height: 0,
          width: 0
        },
        {
          src: `http://someurl.com`,
          height: 0,
          width: 0
        },
        {
          src: `imageId3`,
          height: 0,
          width: 0
        }
      ];

      const newImagesSrcs: Array<Image> = [
        {
          src: `${cloudflareDeliveryUrl}/imageId1/public`,
          height: 0,
          width: 0
        },
        {
          src: `${cloudflareDeliveryUrl}/imageId6/public`,
          height: 0,
          width: 0
        },
        {
          src: `http://someurl2.com`,
          height: 0,
          width: 0
        },
        {
          src: `imageId4`,
          height: 0,
          width: 0
        }
      ];

      await imagesServicesDeleteOldImages({ oldImagesSrcs, newImagesSrcs });

      expect(imagesServicesDeleteMany).toHaveBeenLastCalledWith({
        srcs: [`${cloudflareDeliveryUrl}/imageId2/public`, 'http://someurl.com', 'imageId3']
      });
    });
  });
});
