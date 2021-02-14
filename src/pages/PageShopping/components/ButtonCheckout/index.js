import { useContext } from "react";

import { pages } from "../../../../App/App";

import contextProductList from "../../../../contexts/ContextProductList";
import contextPage from "../../../../contexts/ContextPage";
import contextProcessedProducts from "../../../../contexts/ContextProcessedProducts";
import contextProductsData from "../../../../contexts/ContextProductsData";

import utilGetProcessedProducts from "./utils";

export default () => {
  const { productList = "" } = useContext(contextProductList);
  const { setPage = () => {} } = useContext(contextPage);
  const { productsData = {} } = useContext(contextProductsData);
  const { setProcessedProducts = () => {} } = useContext(
    contextProcessedProducts
  );

  const buttonDisabled = !productList;

  const handleButtonCheckoutClick = () => {
    const productListArray = productList.split(",");

    const processedProducts = utilGetProcessedProducts(
      productListArray,
      productsData
    );

    setProcessedProducts(processedProducts);
    setPage(pages.PAGE_SHOPPING_CHECKOUT_RESULT);
  };

  return (
    <button
      className="button-checkout"
      onClick={handleButtonCheckoutClick}
      disabled={buttonDisabled}
    >
      Checkout
    </button>
  );
};
