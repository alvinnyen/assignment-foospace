import { Consumer as ConsumerContextProductList } from "../../../../contexts/ContextProductList";
import utilCheckout from "./utils";

export default (props = {}) => {
  return (
    <ConsumerContextProductList>
      {(value = {}) => {
        const { productList = "", setProductList = () => {} } = value;

        const handleCheckoutButtOnClick = () => {
          const productListArray =
            (productList && productList.split(",")) || [];
          const { productsData = [] } = props;
          console.log(productList);
          console.log(productListArray);
          console.log(productsData);
          console.log(" ");
          utilCheckout(productListArray, productsData);
        };

        return (
          <button
            className="checkout-button"
            onClick={handleCheckoutButtOnClick}
          >
            Checkout
          </button>
        );
      }}
    </ConsumerContextProductList>
  );
};
