import { useContext, useState } from "react";

import contextProducts from "../../contexts/ContextProducts";
import contextProductsData from "../../contexts/ContextProductsData";
import { Provider as ContextProductListProvider } from "../../contexts/ContextProductList";

import Product from "./components/Product";
import ButtonCheckout from "./components/ButtonCheckout";

import "./PageShopping.css";

export default () => {
  const [productList, setProductList] = useState("");
  const { products = [] } = useContext(contextProducts);
  const { productsData = {} } = useContext(contextProductsData);

  const renderProducts = (products = []) => {
    return products.map((product = {}) => {
      return <Product key={product.productId} product={product} />;
    });
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
      <h1>PageShopping</h1>
      <ContextProductListProvider value={contextValueForContextProductList}>
        {renderProducts(products)}
        <div className="product-list">
          product list: {productList || "no products in the list"}
        </div>
        <ButtonCheckout productsData={productsData} />
      </ContextProductListProvider>
      <button onClick={handleClearProductListButtonOnClick}>
        Clear Product List
      </button>
    </div>
  );
};
