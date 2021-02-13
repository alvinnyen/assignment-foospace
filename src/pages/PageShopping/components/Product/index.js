import { useContext } from "react";

import contextProductList from "../../../../contexts/ContextProductList";

import "./product.css";

export default (props = {}) => {
  const {
    product: { productId = "", productName = "", productPrice = 0 } = {},
  } = props;
  if (!productId || !productName || !productPrice) return null;

  const {
    productList: prevProductList = "",
    setProductList = () => {},
  } = useContext(contextProductList);

  const handleProductOnClick = () => {
    const productList = prevProductList
      ? prevProductList + "," + productId
      : productId;

    setProductList(productList);
  };

  return (
    <div className="wrapper" onClick={handleProductOnClick}>
      <div>product name: {productName}</div>
      <div>product price: {productPrice}</div>
    </div>
  );
};
