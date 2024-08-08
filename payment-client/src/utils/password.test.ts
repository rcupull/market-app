import {
  isPasswordValidLength,
  isPasswordValidLowerCase,
  isPasswordValidNumber,
  isPasswordValidSpecialChar,
  isPasswordValidUppperCase
} from './password';

describe('isPasswordValidLength', () => {
  it.each([
    [false, '123'],
    [true, '123456789'],
    [true, '12345678']
  ])('should return %p when dateIn = %p and showTime is %p', (expected, password) => {
    expect(isPasswordValidLength(password)).toEqual(expected);
  });
});

describe('isPasswordValidLowerCase', () => {
  it.each([
    [false, 'KNHYTRF13723'],
    [true, 'KJUSHD*&#d']
  ])('should return %p when dateIn = %p and showTime is %p', (expected, password) => {
    expect(isPasswordValidLowerCase(password)).toEqual(expected);
  });
});

describe('isPasswordValidNumber', () => {
  it.each([
    [false, 'AALSKDMALKSDMalskdasjd'],
    [true, 'AJKSDNAKJSDNasdajsdn8']
  ])('should return %p when dateIn = %p and showTime is %p', (expected, password) => {
    expect(isPasswordValidNumber(password)).toEqual(expected);
  });
});

describe('isPasswordValidSpecialChar', () => {
  it.each([
    [false, 'LASKDAKSNDaksjdnakjsdn123817239'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239!'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239@'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239#'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239$'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239%'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239^'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239&'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239*'],
    [true, 'LASKDAKSNDaksjdnakjsdn123817239/']
  ])('should return %p when dateIn = %p and showTime is %p', (expected, password) => {
    expect(isPasswordValidSpecialChar(password)).toEqual(expected);
  });
});

describe('isPasswordValidUppperCase', () => {
  it.each([
    [false, 'asdasd123123'],
    [true, 'asdasd123123K']
  ])('should return %p when dateIn = %p and showTime is %p', (expected, password) => {
    expect(isPasswordValidUppperCase(password)).toEqual(expected);
  });
});
