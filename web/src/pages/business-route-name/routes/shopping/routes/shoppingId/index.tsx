import { useEffect } from 'react';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { ShoppingDetails } from 'pages/@common/shopping-details';
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
    <LayoutPageSection title="Compra">
      <div className="w-full flex justify-center">
        <ShoppingDetails shopping={shopping} />
      </div>
    </LayoutPageSection>
  );
};
