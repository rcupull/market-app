import { cloudflareDeliveryUrl, getCloudFlareImageIdFromUrl } from './utils';

describe('getCloudFlareImageIdFromUrl', () => {
  it.each([
    ['imageId', `${cloudflareDeliveryUrl}/imageId/public`],
    ['imageId', `${cloudflareDeliveryUrl}/imageId`],
    ['imageId', 'imageId'],
    [null, 'https://someUrl.com']
  ])('should return %p when value = %p', (expected, value) => {
    expect(getCloudFlareImageIdFromUrl(value)).toEqual(expected);
  });
});
