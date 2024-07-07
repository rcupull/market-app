import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

import { useBusiness } from '../useBusiness';

import { FetchStatus } from 'types/api';
import { Shopping, ShoppingState } from 'types/shopping';

interface UseShoppingReturn {
  //
  constructionShopping: Shopping | undefined;
  constructionShoppingProductsCount: number;
  //
  status: FetchStatus;
  onFetch: () => void;
  onReset: () => void;
}

export const useCart = (): UseShoppingReturn => {
  const { getAllShopping } = useGetAllShopping();
  const { business } = useBusiness();

  const { data, status, reset, fetch } = useApiPersistentPaginated('useCart', getAllShopping);

  const shopping = data || [];
  const firstShopping = shopping[0] || undefined;

  const getProductsCount = (sh: Shopping): number => {
    return (sh?.posts || [])?.reduce((acc, { count }) => acc + count, 0);
  };

  const getShoppingContructionData = (): Pick<
    UseShoppingReturn,
    'constructionShopping' | 'constructionShoppingProductsCount'
  > => {
    if (!firstShopping || firstShopping.state !== ShoppingState.CONSTRUCTION) {
      return {
        constructionShopping: undefined,
        constructionShoppingProductsCount: 0,
      };
    }

    return {
      constructionShopping: firstShopping,
      constructionShoppingProductsCount: getProductsCount(firstShopping),
    };
  };

  return {
    ...getShoppingContructionData(),
    status,
    onFetch: () => {
      business && fetch({ routeName: business.routeName, states: [ShoppingState.CONSTRUCTION] });
    },
    onReset: reset,
  };
};
