import { isValidStrDate } from './date';

describe('isValidStrDate', () => {
  it.each([
    [false, 'wrongDate'],
    [false, '14/1/2022'],
    [false, '14/01/2022'],

    [true, '2022-01-14T20:45:23.242Z'],
    [true, '2022-01-14T18:00:38.351514+00:00'],
    [true, '2022-01-14T18:00:38.351514'],
    [true, 'Fri, 14 Jan 2022 20:45:23 GMT'],
    [true, '1/14/2022, 3:45:23 PM'],
    [true, '1/14/2022'],
  ])('should return %p when strDate = %p', (expected, strDate) => {
    expect(isValidStrDate(strDate)).toEqual(expected);
  });
});
