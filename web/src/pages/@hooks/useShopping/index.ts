import { useGetShopping } from 'features/api/shopping/useGetShopping';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchResource, FetchStatus } from 'types/api';
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
  onFetch: FetchResource<{ routeName: string }, Array<Shopping>>['fetch'];
  onReset: () => void;
}

export const useShopping = (): UseShoppingReturn => {
  const { getShopping } = useGetShopping();

  const { data, status, reset, fetch } = useApiPersistent('useShopping', getShopping);

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
