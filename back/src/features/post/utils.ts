import { FilterQuery, PaginateOptions } from 'mongoose';
import { Post, PostType } from '../../types/post';

export interface GetAllPostArgs {
  routeNames?: Array<string>;
  postsIds?: Array<string>;
  search?: string;
  hidden?: boolean;
  hiddenBusiness?: boolean;
  createdBy?: string;
  //
  postCategoriesTags?: Array<string>;
  postCategoriesMethod?: 'some' | 'every';
  postType?: PostType;
}
export const getAllFilterQuery = ({
  routeNames,
  postsIds,
  search,
  hidden,
  hiddenBusiness,
  createdBy,
  postCategoriesTags,
  postCategoriesMethod,
  postType,
}: GetAllPostArgs): FilterQuery<Post> => {
  const filterQuery: FilterQuery<Post> = {};

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

  if (postType) {
    filterQuery.postType = postType;
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

  ///////////////////////////////////////////////////////////////////

  if (createdBy) {
    filterQuery.createdBy = createdBy;
  }

  return filterQuery;
};
