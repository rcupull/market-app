import { ProductFormField } from 'types/post';

export const getAllProductsFields = () => {
  const record: Record<ProductFormField, boolean> = {
    name: true,
    price: true,
    clothingSizes: true,
    colors: true,
    details: true,
    postCategoriesTags: true,
    discount: true,
    stockAmount: true,
    description: true,
    images: true,
  };

  return Object.keys(record) as Array<ProductFormField>;
};
