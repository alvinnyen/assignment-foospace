import { Consumer as ConsumerContextProductList } from "../../../../contexts/ContextProductList";
import utilCheckout from "./utils";

export default () => {
  return (
    <ConsumerContextProductList>
      {(value = {}) => {
        const { productList = "", setProductList = () => {} } = value;

        const handleCheckoutButtOnClick = () => {
          utilCheckout(productList);
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
