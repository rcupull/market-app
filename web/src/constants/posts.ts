import { PostClothingSize, PostColorMeta } from 'types/post';

export const allColorMeta: PostColorMeta = {
  white: {
    name: 'white',
    bgColor: 'bg-white',
    selectedRingColor: 'ring-gray-400',
  },
  gray: {
    name: 'gray',
    bgColor: 'bg-gray-200',
    selectedRingColor: 'ring-gray-400',
  },
  black: {
    name: 'black',
    bgColor: 'bg-gray-900',
    selectedRingColor: 'ring-gray-900',
  },
};

export const allClotingSize: Array<PostClothingSize> = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
];

type ImagesDimensionsType = 'cardPost' | 'logo';

export const imagesDimensions: Record<ImagesDimensionsType, { width: number; height: number }> = {
  cardPost: {
    width: 246,
    height: 210,
  },
  logo: {
    width: 200,
    height: 200,
  },
};
