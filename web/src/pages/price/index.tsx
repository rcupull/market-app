import { LayoutPage } from 'pages/@common/layout-page';
import { Price as PriceBase } from 'pages/@common/price';

export const Price = () => {
  return (
    <LayoutPage title="Precios">
      <PriceBase />
    </LayoutPage>
  );
};

export default Price;
