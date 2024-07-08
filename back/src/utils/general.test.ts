import { movRow, stringExtract, numberExtract } from './general';

describe('movRow()', () => {
  it('should return a right value 1', async () => {
    expect(movRow(['a', 'b', 'c', 'd', 'e'], 1, 2)).toMatchInlineSnapshot(`
[
  "a",
  "c",
  "b",
  "d",
  "e",
]
`);
  });

  it('should return a right value 1', async () => {
    expect(movRow(['a', 'b', 'c', 'd', 'e'], 1, 4)).toMatchInlineSnapshot(`
[
  "a",
  "c",
  "d",
  "e",
  "b",
]
`);
  });
});

describe('stringExtract()', () => {
  it.each([
    [['name1'], 'products.name.{val}', 'products.name.name1'],
    [null, 'products.name.{val}', 'business.name.name1'],
    [null, 'products.name.{val}', 'products.name.name1.category.cat1'],
    [['name1', 'cat1'], 'products.name.{val}.category.{val}', 'products.name.name1.category.cat1'],
    [null, 'products.name.{val}.category.{val}', 'products.name.name1'],
  ])('should return %p when value = %p', (expected, exp, value) => {
    expect(stringExtract(exp, value)).toEqual(expected);
  });
});

describe('numberExtract()', () => {
  it.each([
    [[78], 'el minimo es 78'],
    [[78, 67], 'el minimo es 78 y el maximo es 67'],
    [[78, 67, 90], 'el minimo es 78, maximo 67 y el intermedio es 90'],
    [[78], 'el minimo ^(*&@!*  #!@#[]{}) es 78 *&*(&${}":?>,'],
  ])('should return %p when value = %p', (expected, value) => {
    expect(numberExtract(value)).toEqual(expected);
  });
});
