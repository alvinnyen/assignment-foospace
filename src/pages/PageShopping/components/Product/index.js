import { useContext } from "react";
import PropTypes from "prop-types";

import contextProductList from "../../../../contexts/ContextProductList";

import "./product.css";

const Product = (props = {}) => {
  const {
    productList: prevProductList = "",
    setProductList = () => {},
  } = useContext(contextProductList);
  const {
    product: { productId = "", productName = "", productPrice = 0 } = {},
  } = props;
  if (!productId || !productName || !productPrice) return null;

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

Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
