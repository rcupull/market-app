import { ProductHighLights1 } from '.';

export default {
  component: ProductHighLights1
};

export const Default = (): JSX.Element => (
  <ProductHighLights1
    title="Highlights"
    value={[
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton'
    ]}
  />
);
