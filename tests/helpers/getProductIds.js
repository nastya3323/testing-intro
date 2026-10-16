const getProductIds = (products) => {
  return products.map((product) => product.id);
};

module.exports = { getProductIds };
