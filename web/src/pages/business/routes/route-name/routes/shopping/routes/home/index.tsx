import { useEffect } from 'react';

import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { getOneShoppingRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  const { getAllShopping } = useGetAllShopping();
  const { pushRoute } = useRouter();

  useEffect(() => {
    getAllShopping.fetch({ routeName });
  }, []);

  return (
    <LayoutPageSection title="Tus compras">
      <div className="flex flex-col items-center gap-4">
        {getAllShopping.data?.map((shopping, index) => {
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
export default Home;
