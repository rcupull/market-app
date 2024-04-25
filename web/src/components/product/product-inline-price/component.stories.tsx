import { ProductInlinePrice } from '.';

export default {
  component: ProductInlinePrice,
};

export const Default = (): JSX.Element => (
  <ProductInlinePrice
    imageSrc="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
    href="#"
    name="Earthen Bottle"
    price="$78"
    description="White"
  />
);
