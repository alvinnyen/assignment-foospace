import "./product.css";

export default (props = {}) => {
  const {
    product: { productId = "", productName = "", productPrice = 0 } = {},
  } = props;
  if (!productId || !productName || !productPrice) return null;
  return (
    <div className="wrapper">
      <div>product name: {productName}</div>
      <div>product price: {productPrice}</div>
    </div>
  );
};
