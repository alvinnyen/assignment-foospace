import { Consumer as ConsumerContextProductList } from "../../../../contexts/ContextProductList";
import utilCheckout from "./utils";

export default (props = {}) => {
  return (
    <ConsumerContextProductList>
      {(value = {}) => {
        const { productList = "", setProductList = () => {} } = value;
        const buttonDisabled = !productList;

        const handleCheckoutButtOnClick = () => {
          const productListArray = productList.split(",");
          const { productsData = {} } = props;
          // console.log(productList);
          // console.log(productListArray);
          // console.log(productsData);
          // console.log(" ");
          const total = utilCheckout(productListArray, productsData);
          console.log(total);
        };

        return (
          <button
            className="checkout-button"
            onClick={handleCheckoutButtOnClick}
            disabled={buttonDisabled}
          >
            Checkout
          </button>
        );
      }}
    </ConsumerContextProductList>
  );
};
