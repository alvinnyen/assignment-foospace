import { useState } from "react";

import PageShopping from "../pages/PageShopping";
import PageShoppingCheckoutResult from "../pages/PageShoppingCheckoutResult";
import Composer from "./hocs/Composer";

import { Provider as ContextPageProvider } from "../contexts/ContextPage";
import { Provider as ContextProcessedProductsProvider } from "../contexts/ContextProcessedProducts";

const pages = {
  PAGE_SHOPPING: "PAGE_SHOPPING",
  PAGE_SHOPPING_CHECKOUT_RESULT: "PAGE_SHOPPING_CHECKOUT_RESULT",
};

function App() {
  const [page, setPage] = useState(pages.PAGE_SHOPPING);
  const [processedProducts, setProcessedProducts] = useState([]);

  const renderPage = (page = "") => {
    const { PAGE_SHOPPING = "", PAGE_SHOPPING_CHECKOUT_RESULT = "" } = pages;

    switch (page) {
      case PAGE_SHOPPING:
        return <PageShopping />;
      case PAGE_SHOPPING_CHECKOUT_RESULT:
        return <PageShoppingCheckoutResult />;
      default:
        return <PageShopping />;
    }
  };

  const contexts = [
    {
      contextProvider: ContextPageProvider,
      contextValue: {
        page,
        setPage,
      },
    },
    {
      contextProvider: ContextProcessedProductsProvider,
      contextValue: {
        processedProducts,
        setProcessedProducts,
      },
    },
  ];

  return (
    <div className="App">
      <Composer contexts={contexts}>{renderPage(page)}</Composer>
    </div>
  );
}

export { pages };
export default App;
