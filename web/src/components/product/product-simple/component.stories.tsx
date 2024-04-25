import { ProductSimple } from '.';

export default {
  component: ProductSimple,
};

export const Default = (): JSX.Element => (
  <ProductSimple
    post={{
      _id: '_id',
      createdBy: 'createdById',
      createdAt: new Date().toISOString(),
      currency: 'USD',
      description: 'Description',
      name: 'Earthen Bottle',
      price: 78,
      routeName: 'routeName',
      images: [
        {
          src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
          width: 50,
          height: 50,
        },
      ],
    }}
    href="#"
  />
);
