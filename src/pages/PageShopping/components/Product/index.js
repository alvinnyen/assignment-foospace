import "./Product.css";

import { Consumer as ConsumerContextProductList } from "../../../../contexts/ContextProductList";

export default (props = {}) => {
  const {
    product: { productId = "", productName = "", productPrice = 0 } = {},
  } = props;
  if (!productId || !productName || !productPrice) return null;
  return (
    <ConsumerContextProductList>
      {(value = {}) => {
        const handleOnClick = () => {
          const {
            productList: prevProductList = "",
            setProductList = () => {},
          } = value;
          const productList = prevProductList
            ? prevProductList + "," + productId
            : productId;

          setProductList(productList);
        };
        return (
          <div className="wrapper" onClick={handleOnClick}>
            <div>product name: {productName}</div>
            <div>product price: {productPrice}</div>
          </div>
        );
      }}
    </ConsumerContextProductList>
  );
};
