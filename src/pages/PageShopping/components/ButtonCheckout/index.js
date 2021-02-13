import { useContext } from "react";

import contextProductList from "../../../../contexts/ContextProductList";
import utilGetProcessedProducts from "./utils";

export default (props = {}) => {
  const { productList = "", setProductList = () => {} } = useContext(
    contextProductList
  );

  const buttonDisabled = !productList;

  const handleCheckoutButtOnClick = () => {
    const productListArray = productList.split(",");
    const { productsData = {} } = props;
    // console.log(productList);
    // console.log(productListArray);
    // console.log(productsData);
    // console.log(" ");
    const processedProducts = utilGetProcessedProducts(
      productListArray,
      productsData
    );
    console.log(processedProducts);
    console.log(" ");
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
};
