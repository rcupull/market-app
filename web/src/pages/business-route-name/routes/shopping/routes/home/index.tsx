import { useEffect } from 'react';

import { useGetShopping } from 'features/api/shopping/useGetShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { getOneShoppingRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  const { getShopping } = useGetShopping();
  const { pushRoute } = useRouter();

  useEffect(() => {
    getShopping.fetch({ routeName });
  }, []);

  return (
    <LayoutPageSection title="Tus compras">
      <div className="flex flex-col items-center gap-4">
        {getShopping.data?.map((shopping, index) => {
          return (
            <ShoppingDetails
              key={index}
              shopping={shopping}
              onClick={() =>
                pushRoute(getOneShoppingRoute({ routeName, shoppingId: shopping._id }))
              }
            />
          );
        })}
      </div>
    </LayoutPageSection>
  );
};
