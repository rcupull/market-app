import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Business, BusinessCategory, PostCategory } from '../../types/business';
import { addStringToUniqueArray, isNumber, replaceAll } from '../../utils/general';
import { Shopping } from '../../types/shopping';
import { ModelDocument } from '../../types/general';

export interface GetAllBusinessArgs extends FilterQuery<Business> {
  createdBy?: string;
  routeNames?: Array<string>;
  search?: string;
  hidden?: boolean;
}

export type UpdateQueryBusiness =
  | UpdateQuery<
      Partial<
        Pick<
          Business,
          | 'hidden'
          | 'socialLinks'
          | 'bannerImages'
          | 'name'
          | 'routeName'
          | 'logo'
          | 'layouts'
          | 'postCategories'
          | 'aboutUsPage'
          | 'aboutUsPage'
          | 'telegramBotChat'
        >
      >
    >
  | UpdateWithAggregationPipeline;

export const getPostCategoriesFromBusinessCategories = (
  businessCategories: Array<BusinessCategory>,
): Array<PostCategory> => {
  let allLabels: Array<string> = [];

  const ifStartWithThenAdd = (
    businessCategory: BusinessCategory,
    match: BusinessCategory,
    val: Array<string>,
  ) => {
    if (businessCategory.startsWith(match)) {
      allLabels = val.reduce((acc, v) => addStringToUniqueArray(acc, v), allLabels);
    }
  };

  businessCategories.forEach((businessCategory) => {
    ifStartWithThenAdd(businessCategory, 'clothing', ['Recientes']);
    ifStartWithThenAdd(businessCategory, 'clothing', ['Ofertas']);
    ifStartWithThenAdd(businessCategory, 'clothing.men', ['Hombres']);
    ifStartWithThenAdd(businessCategory, 'clothing.kids', ['Niños']);
    ifStartWithThenAdd(businessCategory, 'clothing.women', ['Mujeres']);
    ifStartWithThenAdd(businessCategory, 'clothing.sportswearAndActivewear', ['Deportivas']);

    //////////////////////////////////////////////////////////////////////

    ifStartWithThenAdd(businessCategory, 'fastFood', [
      'Ofertas del día',
      'Especialidad de la casa',
      'Más vendido',
    ]);

    //////////////////////////////////////////////////////////////////////

    ifStartWithThenAdd(businessCategory, 'computers', ['Ofertas', 'Nuevos Productos']);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'house', ['Ofertas']);
    ifStartWithThenAdd(businessCategory, 'house.rent', [
      'Para cubanos',
      'Para extranjeros',
      'Por horas',
      'Por tiempo indefinido',
      'Económicos',
      'En la ciudad',
      'En la Playa',
    ]);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'services', ['Nuevas ofertas', 'Especiales', 'Rebajas']);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'miscellaneousItems', ['Nuevas ofertas', 'Rebajas']);
  });

  return allLabels.map((label) => ({ label, tag: getPostCategoryTag(label) }));
};

// is the same functio that frontend
export const getPostCategoryTag = (label: string): string => {
  let out = label.trim().toLowerCase();
  out = replaceAll(out, ' ', '_');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};

export const getAllFilterQuery = ({
  createdBy,
  routeNames,
  search,
  hidden,
  ...omittedQuery
}: GetAllBusinessArgs): FilterQuery<Business> => {
  const filterQuery: FilterQuery<Business> = omittedQuery;

  ///////////////////////////////////////////////////////////////////
  if (createdBy) {
    filterQuery.createdBy = createdBy;
  }
  ///////////////////////////////////////////////////////////////////

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }
  ///////////////////////////////////////////////////////////////////

  if (search) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(search), $options: 'i' } },
      { postCategories: { $elemMatch: { label: { $regex: new RegExp(search), $options: 'i' } } } },
    ];
  }
  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  return filterQuery;
};

export const getShoppingData = (
  shopping: ModelDocument<Shopping>,
): {
  totalProducts: number;
  totalPrice: number;
} => {
  let totalProducts = 0;
  let totalPrice = 0;

  shopping.posts.forEach(({ count, postData }) => {
    if (!postData.price || !isNumber(postData.price)) {
      console.log('not price number');
      return;
    }

    totalProducts = totalProducts + count;
    totalPrice = totalPrice + postData.price * count;
  });

  return {
    totalProducts,
    totalPrice,
  };
};
