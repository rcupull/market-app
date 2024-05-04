import { PostClothingSize, PostColorMeta } from 'types/post';

export const allColorMeta: PostColorMeta = {
  black: {
    name: 'black',
    bgColor: 'bg-gray-900',
    selectedRingColor: 'ring-gray-900',
  },
  white: {
    name: 'white',
    bgColor: 'bg-white',
    selectedRingColor: 'ring-gray-400',
  },
  slate: {
    name: 'slate',
    bgColor: 'bg-slate-500',
    selectedRingColor: 'ring-slate-500',
  },
  gray: {
    name: 'gray',
    bgColor: 'bg-gray-500',
    selectedRingColor: 'ring-gray-500',
  },
  pink: {
    name: 'pink',
    bgColor: 'bg-pink-500',
    selectedRingColor: 'ring-pink-500',
  },
  fuchsia: {
    name: 'fuchsia',
    bgColor: 'bg-fuchsia-500',
    selectedRingColor: 'ring-fuchsia-500',
  },
  purple: {
    name: 'purple',
    bgColor: 'bg-purple-500',
    selectedRingColor: 'ring-purple-500',
  },
  violet: {
    name: 'violet',
    bgColor: 'bg-violet-500',
    selectedRingColor: 'ring-violet-500',
  },
  blue: {
    name: 'blue',
    bgColor: 'bg-blue-500',
    selectedRingColor: 'ring-blue-500',
  },
  cyan: {
    name: 'cyan',
    bgColor: 'bg-cyan-500',
    selectedRingColor: 'ring-cyan-500',
  },
  teal: {
    name: 'teal',
    bgColor: 'bg-teal-500',
    selectedRingColor: 'ring-teal-500',
  },
  green: {
    name: 'green',
    bgColor: 'bg-green-500',
    selectedRingColor: 'ring-green-500',
  },
  yellow: {
    name: 'yellow',
    bgColor: 'bg-yellow-500',
    selectedRingColor: 'ring-yellow-500',
  },
  red: {
    name: 'red',
    bgColor: 'bg-red-500',
    selectedRingColor: 'ring-red-500',
  },

  orange: {
    name: 'orange',
    bgColor: 'bg-orange-500',
    selectedRingColor: 'ring-orange-500',
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
