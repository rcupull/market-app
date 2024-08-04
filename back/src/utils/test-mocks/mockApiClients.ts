import { UnknownRecord } from '../../types/general';
import * as apiUtils from '../api';

type AxiosT = typeof apiUtils.axios;

type FetureFn<T extends AxiosT> = (...args: Parameters<T>) => Promise<any>;

type ImplementationFeature<T extends AxiosT> =
  | FetureFn<T>
  | number
  | string
  | UnknownRecord
  | Array<UnknownRecord>;

type ImplementationFeatures<T extends AxiosT> =
  | [ImplementationFeature<T>]
  | [ImplementationFeature<T>, ImplementationFeature<T>]
  | [ImplementationFeature<T>, ImplementationFeature<T>, ImplementationFeature<T>]
  | [
      ImplementationFeature<T>,
      ImplementationFeature<T>,
      ImplementationFeature<T>,
      ImplementationFeature<T>
    ];

export const mockAxios = (
  features?: ImplementationFeatures<AxiosT>
): {
  axios: jest.SpyInstance;
} => {
  const axios = jest.spyOn(apiUtils, 'axios');

  const handleMakeImplementation = (
    feature: ImplementationFeature<AxiosT> | undefined,
    last: boolean
  ): void => {
    const implementation: ImplementationFeature<AxiosT> =
      feature instanceof Function ? feature : () => new Promise((resolve) => resolve(feature));

    if (last) {
      axios.mockImplementation(implementation);
    } else {
      axios.mockImplementationOnce(implementation);
    }
  };

  switch (features?.length) {
    case 1:
      handleMakeImplementation(features[0], true);
      break;
    case 2:
      handleMakeImplementation(features[0], false);
      handleMakeImplementation(features[1], true);
      break;
    case 3:
      handleMakeImplementation(features[0], false);
      handleMakeImplementation(features[1], false);
      handleMakeImplementation(features[2], true);
      break;
    case 4:
      handleMakeImplementation(features[0], false);
      handleMakeImplementation(features[1], false);
      handleMakeImplementation(features[2], false);
      handleMakeImplementation(features[3], true);
      break;
    default:
      handleMakeImplementation(undefined, true);
      break;
  }

  return { axios };
};
