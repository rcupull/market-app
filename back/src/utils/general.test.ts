import { movRow, stringExtract } from './general';

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
