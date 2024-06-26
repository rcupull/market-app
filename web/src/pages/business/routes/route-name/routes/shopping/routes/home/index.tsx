import { useEffect } from 'react';

import { useGetAllShopping } from 'features/api/shopping/useGetAllShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { ShoppingButtonCancel } from 'pages/@common/shopping-button-cancel';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { ShoppingState } from 'pages/@common/shopping-state';
import { getOneShoppingRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  const { getAllShopping } = useGetAllShopping();
  const { pushRoute } = useRouter();

  const onRefresh = () => getAllShopping.fetch({ routeName });

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutPage title="Mis compras">
      <div className="flex flex-col items-center gap-4 w-full">
        {getAllShopping.data?.map((shopping, index) => {
          return (
            <ShoppingDetails
              key={index}
              shopping={shopping}
              getActions={({ shopping }) => {
                const { state } = shopping;
                return (
                  <>
                    <ShoppingState shopping={shopping} />
                    <ShoppingButtonStateHistory shopping={shopping} />
                    {state === 'REQUESTED' && (
                      <ShoppingButtonCancel shopping={shopping} onAfterSucess={onRefresh} />
                    )}
                  </>
                );
              }}
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
