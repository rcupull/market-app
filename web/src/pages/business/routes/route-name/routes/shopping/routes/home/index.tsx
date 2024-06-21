import { useEffect } from 'react';

import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
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
    <LayoutPage title="Mis compras">
      <div className="flex flex-col items-center gap-4 w-full">
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
    </LayoutPage>
  );
};
export default Home;
