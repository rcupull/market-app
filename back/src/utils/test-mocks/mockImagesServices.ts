import * as all from '../../features/images/services';

export const mockImagesServicesDeleteOne = (): {
  imagesServicesDeleteOne: jest.SpyInstance;
} => {
  const imagesServicesDeleteOne = jest
    .spyOn(all, 'imagesServicesDeleteOne')
    .mockImplementation(jest.fn());

  return { imagesServicesDeleteOne };
};

export const mockImagesServicesDeleteOldImages = (): {
  imagesServicesDeleteOldImages: jest.SpyInstance;
} => {
  const imagesServicesDeleteOldImages = jest
    .spyOn(all, 'imagesServicesDeleteOldImages')
    .mockImplementation(jest.fn());

  return { imagesServicesDeleteOldImages };
};

export const mockImagesServicesDeleteMany = (): {
  imagesServicesDeleteMany: jest.SpyInstance;
} => {
  const imagesServicesDeleteMany = jest
    .spyOn(all, 'imagesServicesDeleteMany')
    .mockImplementation(jest.fn());

  return { imagesServicesDeleteMany };
};
export const mockImagesServicesGetAll = (): {
  imagesServicesGetAll: jest.SpyInstance;
} => {
  const imagesServicesGetAll = jest
    .spyOn(all, 'imagesServicesGetAll')
    .mockImplementation(jest.fn());

  return { imagesServicesGetAll };
};

export const mockImagesServicesDeleteBulk = (): {
  imagesServicesDeleteBulk: jest.SpyInstance;
} => {
  const imagesServicesDeleteBulk = jest
    .spyOn(all, 'imagesServicesDeleteBulk')
    .mockImplementation(jest.fn());

  return { imagesServicesDeleteBulk };
};
