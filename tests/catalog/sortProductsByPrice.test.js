const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');
const { getProductIds } = require('../helpers/getProductIds');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(getProductIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(getProductIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));

    expect(getProductIds(sortProductsByPrice(subset, 'asc'))).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(getProductIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const subset = products.filter((p) => [3, 1, 4].includes(p.id));

    expect(getProductIds(sortProductsByPrice(subset, 'desc'))).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const subset = products.filter((p) => [5, 2, 6].includes(p.id));

    expect(getProductIds(sortProductsByPrice(subset, 'desc'))).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));

    const snapshot = structuredClone(subset);

    sortProductsByPrice(subset, 'asc');
    expect(subset).toEqual(snapshot);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter((p) => [1, 3, 4].includes(p.id));

    const snapshot = structuredClone(subset);

    sortProductsByPrice(subset, 'desc');
    expect(subset).toEqual(snapshot);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const snapshot = structuredClone(products);

    sortProductsByPrice(products);
    expect(products).toEqual(snapshot);
  });
});
