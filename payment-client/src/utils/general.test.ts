import { deepJsonCopy, isEqual } from './general';

const obj = {
  postType: 'product',
  _id: '6638348afae0b1017b5e2ce5',
  createdAt: '2024-05-05T22:35:18.490Z',
  routeName: 'yarari',
  currency: 'MLC',
  description: 'camisas de algodon con estilo tropical',
  details:
    'Camisas provenintes de la indica de algodon de lupe, diseñadas para la comodidad de ustros clientes',
  hidden: false,
  hiddenBusiness: false,
  createdBy: '66381d92fae0b1017b5e2c36',
  postCategoriesTags: ['hombres'],
  images: [
    {
      src: 'https://i.pinimg.com/474x/39/42/c5/3942c5ec65becb58ad1d8c06a6eac4d9.jpg',
      width: 464,
      height: 493,
      _id: '6638348afae0b1017b5e2cf1'
    },
    {
      src: 'https://www.tailorclub.co/wp-content/uploads/2023/10/I-understand-wish-to-continue--768x1024.jpg',
      width: 768,
      height: 1024,
      _id: '6638348afae0b1017b5e2cf2'
    }
  ],
  clothingSizes: ['XS', 'XXS', 'S'],
  colors: ['cyan'],
  reviews: [0, 0, 0, 0, 0],
  name: 'Camisas para hombres',
  price: 200,
  stockAmount: null,
  __v: 0,
  discount: 10
};

const arr = [0, 3, 'some', obj];

describe('isEqual', () => {
  it.each([
    [true, 1, 1],
    [false, 1, 5],
    //
    [true, 'abc', 'abc'],
    [false, 'abc', 'abd'],
    //
    [true, obj, deepJsonCopy(obj)],
    [false, obj, { ...deepJsonCopy(obj), _id: 'wrong id' }],
    [false, obj, { ...deepJsonCopy(obj), newProp: 'someNewValue' }],
    //
    [true, arr, deepJsonCopy(arr)],
    [false, arr, [...deepJsonCopy(arr), undefined]],
    [false, arr, [...deepJsonCopy(arr), null]],
    [false, arr, [...deepJsonCopy(arr), 'wrong value']]
  ])('should return %p when dateIn = %p and showTime is %p', (expected, value1, value2) => {
    expect(isEqual(value1, value2)).toEqual(expected);
  });
});
