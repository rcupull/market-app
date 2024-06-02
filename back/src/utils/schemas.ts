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
