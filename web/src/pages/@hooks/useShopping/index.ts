import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

import { FetchResourceWithPagination, FetchStatus } from 'types/api';
import { Shopping } from 'types/shopping';

interface UseShoppingReturn {
  data: Array<Shopping>;
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
  const firstShopping = shopping[0] || undefined;

  const getProductsCount = (sh: Shopping): number => {
    return (sh?.posts || [])?.reduce((acc, { count }) => acc + count, 0);
  };

  const getShoppingContructionData = (): Pick<
    UseShoppingReturn,
    'constructionShopping' | 'constructionShoppingProductsCount'
  > => {
    if (!firstShopping || firstShopping.state !== 'CONSTRUCTION') {
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
    data: data || [],
    ...getShoppingContructionData(),
    status,
    onFetch: fetch,
    onReset: reset,
  };
};
