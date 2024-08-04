import { getIsValidNumber, getIsValidPositiveNumber } from './validation';

describe('getIsValidNumber', () => {
  it.each([
    [true, '.12'],
    [true, '12'],
    [true, '12.6'],
    [true, '12.'],
    [true, '-12.6'],
    [false, '12.87.89'],
    [false, 'a1312kjh1']
  ])('should return %p when number = %p', (expected, number) => {
    expect(getIsValidNumber(number)).toEqual(expected);
  });
});

describe('getIsValidPositiveNumber', () => {
  it.each([
    [true, '.12'],
    [true, '12'],
    [true, '12.6'],
    [true, '12.'],
    [false, '-12.6'],
    [false, '12.87.89'],
    [false, 'a1312kjh1']
  ])('should return %p when number = %p', (expected, number) => {
    expect(getIsValidPositiveNumber(number)).toEqual(expected);
  });
});
