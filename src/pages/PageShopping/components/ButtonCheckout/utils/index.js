function loadProduct(productListArray = [], productsData = {}) {
  return productListArray.map((productId = "", index) => {
    const { productName = "", productPrice = 0 } = productsData[productId];
    return {
      productId,
      productName,
      productPrice,
      positionInProducts: index,
    };
  });
}

export default (productListArray = [], productsData = {}) => {
  let products = loadProduct(productListArray, productsData);
  console.log(products);
};
