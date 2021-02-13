import { useContext } from "react";

import { pages } from "../../../../App/App";

import contextProductList from "../../../../contexts/ContextProductList";
import contextPage from "../../../../contexts/ContextPage";
import contextProcessedProducts from "../../../../contexts/ContextProcessedProducts";

import utilGetProcessedProducts from "./utils";

export default (props = {}) => {
  const { productList = "", setProductList = () => {} } = useContext(
    contextProductList
  );
  const { setPage = () => {} } = useContext(contextPage);
  const { setProcessedProducts = () => {} } = useContext(
    contextProcessedProducts
  );

  const buttonDisabled = !productList;

  const handleButtOnCheckoutClick = () => {
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

    // TODO: check the length of processedProducts ?
    setProcessedProducts(processedProducts);
    setPage(pages.PAGE_SHOPPING_CHECKOUT_RESULT);
  };

  return (
    <button
      className="checkout-button"
      onClick={handleButtOnCheckoutClick}
      disabled={buttonDisabled}
    >
      Checkout
    </button>
  );
};
