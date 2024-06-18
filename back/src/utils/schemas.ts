import { SchemaDefinition } from 'mongoose';
import { PostClothingSize } from '../types/post';

export const createdAtSchemaDefinition: SchemaDefinition = {
  createdAt: { type: Date, required: true, default: new Date() },
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
