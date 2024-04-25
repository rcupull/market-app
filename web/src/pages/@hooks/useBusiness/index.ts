import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useAuth } from 'features/api-slices/useAuth';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchOptions } from 'hooks/useFetch';

import { FetchStatus } from 'types/api';
import { Business } from 'types/business';

export const useBusiness = (): {
  business: Business | null;
  status: FetchStatus;
  onFetch: (args: { routeName: string }, options?: FetchOptions) => void;
  onReset: () => void;
  owner: boolean;
  hasSomeShoppingCartStrategy: boolean;
} => {
  const { getOneBusiness } = useGetOneBusiness();
  const { authData } = useAuth();

  const { data, status, reset, fetch } = useApiPersistent('useBusiness', getOneBusiness);

  const getHasSomeShoppingCartStrategy = () => {
    switch (data?.shoppingStrategy) {
      case 'addToCart_whatsAppWithOwner_pickUpProduct':
        return true;
      default:
        return false;
    }
  };

  return {
    owner: authData?.user._id === data?.createdBy,
    hasSomeShoppingCartStrategy: getHasSomeShoppingCartStrategy(),
    onFetch: ({ routeName }, options) => fetch({ routeName }, options),
    onReset: reset,
    status,
    business: data,
  };
};
