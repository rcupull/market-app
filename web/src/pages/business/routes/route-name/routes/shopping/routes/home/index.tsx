import { useEffect } from 'react';

import { useGetAllConstructedShopping } from 'features/api/shopping/useGetAllConstructedShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { ShoppingButtonCancel } from 'pages/@common/shopping-button-cancel';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { ShoppingStateBadge } from 'pages/@common/shopping-state-badge';
import { ShoppingState } from 'types/shopping';
import { getOneShoppingRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  const { getAllConstructedShopping } = useGetAllConstructedShopping();
  const { pushRoute } = useRouter();

  const state_ne = ShoppingState.CONSTRUCTION;
  const onRefresh = () => getAllConstructedShopping.fetch({ routeName, state_ne});

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutPage title="Historial de compras" backButton>
      <div className="flex flex-col items-center gap-4 w-full">
        {getAllConstructedShopping.data?.map((shopping, index) => {
          return (
            <ShoppingDetails
              key={index}
              shopping={shopping}
              getActions={({ shopping }) => {
                const { state } = shopping;
                return (
                  <>
                    <ShoppingStateBadge shopping={shopping} />
                    <ShoppingButtonStateHistory shopping={shopping} />
                    {state === ShoppingState.REQUESTED && (
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
