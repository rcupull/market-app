import { cloudFlareAccountId, cloudFlareApiToken } from '../../config';
import { Image } from '../../types/general';
import { mockAxios } from '../../utils/test-mocks/mockApiClients';
import * as services from './services';
import { cloudflareDeliveryUrl } from './utils';

const { deleteOne, deleteMany, deleteOldImages } = services;

describe('services', () => {
  describe('deleteOne', () => {
    it('should call axios with right params when call to remove with image url', async () => {
      const { axios } = mockAxios();

      await deleteOne({ src: `${cloudflareDeliveryUrl}/imageId/public` });

      expect(axios).toHaveBeenCalledWith({
        headers: {
          Authorization: `Bearer ${cloudFlareApiToken}`,
        },
        method: 'delete',
        url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareAccountId}/images/v1/imageId`,
      });
    });

    it('should call axios with right params when call to remove with image id', async () => {
      const { axios } = mockAxios();

      await deleteOne({ src: 'imageId' });

      expect(axios).toHaveBeenCalledWith({
        headers: {
          Authorization: `Bearer ${cloudFlareApiToken}`,
        },
        method: 'delete',
        url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareAccountId}/images/v1/imageId`,
      });
    });

    it('should call axios with right params when call to remove with not cloudflare url', async () => {
      const { axios } = mockAxios();

      await deleteOne({ src: 'https://someimage,com' });

      expect(axios).toHaveBeenCalledTimes(0); //no call ti remove when the image is extern
    });
  });

  describe('deleteMany', () => {
    it('should call deleteOne with right params', async () => {
      const deleteOne = jest.spyOn(services, 'deleteOne').mockImplementation(jest.fn());

      const srcs = [
        `${cloudflareDeliveryUrl}/imageId1/public`,
        `${cloudflareDeliveryUrl}/imageId2/public`,
        `${cloudflareDeliveryUrl}/imageId3/public`,
      ];

      await deleteMany({ srcs });

      expect(deleteOne).toHaveBeenCalledTimes(3);

      expect(deleteOne).toHaveBeenCalledWith({ src: srcs[0] });
      expect(deleteOne).toHaveBeenCalledWith({ src: srcs[1] });
      expect(deleteOne).toHaveBeenCalledWith({ src: srcs[2] });
    });
  });

  describe('deleteOldImages', () => {
    it('should call deleteMany with right params', async () => {
      const deleteMany = jest.spyOn(services, 'deleteMany').mockImplementation(jest.fn());

      const oldImagesSrcs: Array<Image> = [
        {
          src: `${cloudflareDeliveryUrl}/imageId1/public`,
          height: 0,
          width: 0,
        },
        {
          src: `${cloudflareDeliveryUrl}/imageId2/public`,
          height: 0,
          width: 0,
        },
        {
          src: `http://someurl.com`,
          height: 0,
          width: 0,
        },
        {
          src: `imageId3`,
          height: 0,
          width: 0,
        },
      ];

      const newImagesSrcs: Array<Image> = [
        {
          src: `${cloudflareDeliveryUrl}/imageId1/public`,
          height: 0,
          width: 0,
        },
        {
          src: `${cloudflareDeliveryUrl}/imageId6/public`,
          height: 0,
          width: 0,
        },
        {
          src: `http://someurl2.com`,
          height: 0,
          width: 0,
        },
        {
          src: `imageId4`,
          height: 0,
          width: 0,
        },
      ];

      await deleteOldImages({ oldImagesSrcs, newImagesSrcs });

      expect(deleteMany).toHaveBeenLastCalledWith({
        srcs: [`${cloudflareDeliveryUrl}/imageId2/public`, 'http://someurl.com', 'imageId3'],
      });
    });
  });
});
