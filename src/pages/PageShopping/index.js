import { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/products/apiProducts";

import { Provider as ContextProductListProvider } from "../../contexts/ContextProductList";

import Product from "./components/Product";
import ButtonCheckout from "./components/ButtonCheckout";

import "./PageShopping.css";

// TODO: check、error handling
// TODO: thought: 確保資料庫拿來的欄位都正確才render

export default () => {
  const [productList, setProductList] = useState("");
  const [productsData, setProductsData] = useState([]);
  useEffect(async () => {
    const { products: productsFromApi = {} } = await apiGetProducts();
    const productsData = [];

    for (let productId in productsFromApi) {
      const {
        name: productName = "",
        price: productPrice = 0,
      } = productsFromApi[productId];

      productName &&
        productPrice > 0 &&
        productsData.push({
          productId,
          productName,
          productPrice,
        });
    }
    setProductsData(productsData);
  }, []);

  const renderProducts = (productsData = []) => {
    return productsData.map((product = {}) => {
      // console.log(product);
      return <Product key={product.productId} product={product} />;
    });
    // console.log("length", productComponents.length);
    // return [...productComponents];
  };

  const contextValueForContextProductList = {
    productList,
    setProductList,
  };

  const handleClearProductListButtonOnClick = () => {
    setProductList("");
  };

  return (
    <div>
      <div>PageShopping</div>
      <ContextProductListProvider value={contextValueForContextProductList}>
        {renderProducts(productsData)}
        <div>product list: {productList || "no products in the list"}</div>
        <ButtonCheckout productsData={productsData} />
      </ContextProductListProvider>
      <button onClick={handleClearProductListButtonOnClick}>
        Clear Product List
      </button>
    </div>
  );
};
