import { ProductImages1 } from '.';

export default {
  component: ProductImages1
};

export const Default = (): JSX.Element => (
  <ProductImages1
    value={[
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
        width: 50,
        height: 50
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        alt: 'Model wearing plain black basic tee.',
        width: 50,
        height: 50
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        alt: 'Model wearing plain gray basic tee.',
        width: 50,
        height: 50
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt: 'Model wearing plain white basic tee.',
        width: 50,
        height: 50
      }
    ]}
  />
);

export const SomeMissing = (): JSX.Element => (
  <ProductImages1
    value={[
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
        width: 50,
        height: 50
      }
    ]}
  />
);
