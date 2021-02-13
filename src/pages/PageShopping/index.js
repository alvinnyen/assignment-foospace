import { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products/apiProducts";

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

  return (
    <div>
      <div>PageShopping</div>
    </div>
  );
};
