import { FilterQuery, SchemaDefinition } from 'mongoose';
import { PostClothingSize } from '../types/post';
import { set } from './general';
import { BaseIdentity } from '../types/general';

export const createdAtSchemaDefinition: SchemaDefinition = {
  createdAt: { type: Date, required: true, default: Date.now },
};

export const allPostClothingSize: Array<PostClothingSize> = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
];

export const getSortQuery = (sort: string | undefined): Record<string, number> | undefined => {
  /**
   * get the query from a field similar to '-createdAt' or 'createdAt'
   */
  if (!sort) return undefined;

  const field = sort[0] === '-' ? sort.slice(1) : sort;
  const direction = sort[0] === '-' ? -1 : 1;

  if (!field || !direction) {
    return undefined;
  }

  return { [field]: direction };
};

export const setFilterQueryWithDates = <T extends BaseIdentity = BaseIdentity>({
  filterQuery,
  dateFrom,
  dateTo,
}: {
  dateFrom?: string;
  dateTo?: string;
  filterQuery: FilterQuery<T>;
}): void => {
  if (dateFrom) {
    //@ts-expect-error ts(2345)
    set(filterQuery, 'createdAt.$gte', new Date(dateFrom));
  }

  if (dateTo) {
    //@ts-expect-error ts(2345)
    set(filterQuery, 'createdAt.$lte', new Date(dateTo));
  }
};
