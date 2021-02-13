import { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products/apiProducts";

import Product from "./components/Product";

// TODO: check、error handling
// TODO: thought: 確保資料庫拿來的欄位都正確才render

export default () => {
  const [products, setProduct] = useState([]);
  useEffect(async () => {
    const { products: productsFromApi = {} } = await apiGetProducts();
    const products = [];

    for (let productId in productsFromApi) {
      const {
        name: productName = "",
        price: productPrice = 0,
      } = productsFromApi[productId];

      productName &&
        productPrice > 0 &&
        products.push({
          productId,
          productName,
          productPrice,
        });
    }
    setProduct(products);
  }, []);

  const renderProducts = (products = []) => {
    return products.map((product = {}) => {
      console.log(product);
      return <Product key={product.productId} product={product} />;
    });
    // console.log("length", productComponents.length);
    // return [...productComponents];
  };

  return (
    <div>
      <div>PageShopping</div>
      {renderProducts(products)}
    </div>
  );
};
