import { useGetOneShopping } from 'features/api/shopping/useGetOneShopping';
import { useApiPersistent } from 'features/slices/useApiPersistent';

export const useShoppingIdPersistent = () => {
  const { getOneShopping } = useGetOneShopping();
  return useApiPersistent('useShoppingIdPersistent', getOneShopping);
};
