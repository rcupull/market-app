import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

import { FetchResourceWithPagination, FetchStatus } from 'types/api';
import { Shopping } from 'types/shopping';

interface UseShoppingReturn {
  data: Array<Shopping>;
  //
  lastShopping: Shopping | undefined;
  //
  constructionShopping: Shopping | undefined;
  constructionShoppingProductsCount: number;
  //
  status: FetchStatus;
  onFetch: FetchResourceWithPagination<{ routeName: string }, Shopping>['fetch'];
  onReset: () => void;
}

export const useShopping = (): UseShoppingReturn => {
  const { getAllShopping } = useGetAllShopping();

  const { data, status, reset, fetch } = useApiPersistentPaginated('useShopping', getAllShopping);

  const shopping = data || [];
  const shoppingCount = shopping.length;
  const lastShopping = shoppingCount ? shopping[shoppingCount - 1] : undefined;

  const getProductsCount = (sh: Shopping): number => {
    return (sh?.posts || [])?.reduce((acc, { count }) => acc + count, 0);
  };

  const getShoppingContructionData = (): Pick<
    UseShoppingReturn,
    'constructionShopping' | 'constructionShoppingProductsCount'
  > => {
    if (!lastShopping || lastShopping.state !== 'CONSTRUCTION') {
      return {
        constructionShopping: undefined,
        constructionShoppingProductsCount: 0,
      };
    }

    return {
      constructionShopping: lastShopping,
      constructionShoppingProductsCount: getProductsCount(lastShopping),
    };
  };

  return {
    data: data || [],
    //
    lastShopping,
    //
    ...getShoppingContructionData(),
    status,
    onFetch: fetch,
    onReset: reset,
  };
};
