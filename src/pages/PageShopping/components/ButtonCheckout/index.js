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

  const handleButtonCheckoutClick = () => {
    const productListArray = productList.split(",");
    const { productsData = {} } = props;

    const processedProducts = utilGetProcessedProducts(
      productListArray,
      productsData
    );

    setProcessedProducts(processedProducts);
    setPage(pages.PAGE_SHOPPING_CHECKOUT_RESULT);
  };

  return (
    <button
      className="checkout-button"
      onClick={handleButtonCheckoutClick}
      disabled={buttonDisabled}
    >
      Checkout
    </button>
  );
};
