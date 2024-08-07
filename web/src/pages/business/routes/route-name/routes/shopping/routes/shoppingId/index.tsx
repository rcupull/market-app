import { useEffect } from 'react';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { ShoppingStateBadge } from 'pages/@common/shopping-state-badge';
import { useShoppingIdPersistent } from 'pages/@hooks/useShoppingIdPersistent';

export const ShoppingId = () => {
  const { params } = useRouter();

  const { shoppingId } = params;

  const shoppingIdPersistent = useShoppingIdPersistent();

  useEffect(() => {
    if (shoppingId) {
      shoppingIdPersistent.fetch({ shoppingId });

      return () => {
        shoppingIdPersistent.reset();
      };
    }
  }, [shoppingId]);

  const shopping = shoppingIdPersistent.data;

  if (!shopping) {
    return <></>;
  }

  return (
    <LayoutPage title="Órden de compra">
      <div className="w-full flex justify-center">
        <ShoppingDetails
          shopping={shopping}
          getActions={({ shopping }) => {
            return (
              <>
                <ShoppingStateBadge shopping={shopping} />
                <ShoppingButtonStateHistory shopping={shopping} />
              </>
            );
          }}
        />
      </div>
    </LayoutPage>
  );
};

export default ShoppingId;
