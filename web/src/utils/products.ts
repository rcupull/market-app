import { getOneBusinessRoute } from './business';

import { PostLink, ProductFormField } from 'types/post';

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
    images: true
  };

  return Object.keys(record) as Array<ProductFormField>;
};

export const getRedirectLinkFromPostLink = (postLink: PostLink | undefined): string => {
  const { type, value } = postLink || {};
  if (!value) {
    console.log('should has some value in href');
    return '#';
  }

  if (type === 'external') {
    return value.startsWith('http') ? value : `https://${value}`;
  }

  if (type === 'business') {
    return getOneBusinessRoute({ routeName: value });
  }

  return '#';
};
