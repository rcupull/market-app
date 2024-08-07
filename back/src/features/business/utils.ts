import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Business } from '../../types/business';
import { replaceAll } from '../../utils/general';

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
        >
      >
    >
  | UpdateWithAggregationPipeline;

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
      { postCategories: { $elemMatch: { label: { $regex: new RegExp(search), $options: 'i' } } } }
    ];
  }
  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  return filterQuery;
};
