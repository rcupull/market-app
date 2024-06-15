import { FilterQuery } from 'mongoose';
import { Post } from '../../types/post';
import { getFlattenUndefinedJson } from '../../utils/general';

export interface GetAllPostArgs extends FilterQuery<Post> {
  routeNames?: Array<string>;
  postsIds?: Array<string>;
  search?: string;
  hidden?: boolean;
  hiddenBusiness?: boolean;
  //
  postCategoriesTags?: Array<string>;
  postCategoriesMethod?: 'some' | 'every';
}
export const getAllFilterQuery = ({
  routeNames,
  postsIds,
  search,
  hidden,
  hiddenBusiness,
  postCategoriesTags,
  postCategoriesMethod,
  ...omittedQuery
}: GetAllPostArgs): FilterQuery<Post> => {
  const filterQuery: FilterQuery<Post> = omittedQuery;

  if (search) {
    filterQuery.name = { $regex: new RegExp(search), $options: 'i' };
  }

  if (postCategoriesTags) {
    switch (postCategoriesMethod) {
      case 'every': {
        filterQuery.postCategoriesTags = { $all: postCategoriesTags };
        break;
      }
      case 'some': {
        filterQuery.postCategoriesTags = { $in: postCategoriesTags };
        break;
      }
      default: {
        filterQuery.postCategoriesTags = { $all: postCategoriesTags };
        break;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  if (postsIds?.length) {
    filterQuery._id = { $in: postsIds };
  }

  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  ///////////////////////////////////////////////////////////////////

  if (hiddenBusiness !== undefined) {
    filterQuery.hiddenBusiness = hiddenBusiness;
  }

  return getFlattenUndefinedJson(filterQuery);
};
