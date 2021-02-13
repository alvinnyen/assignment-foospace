import { useState } from "react";

import PageShopping from "../pages/PageShopping";
import PageShoppingCheckoutResult from "../pages/PageShoppingCheckoutResult";

import { Provider as ContextPageProvider } from "../contexts/ContextPage";

const pages = {
  PAGE_SHOPPING: "PAGE_SHOPPING",
  PAGE_SHOPPING_CHECKOUT_RESULT: "PAGE_SHOPPING_CHECKOUT_RESULT",
};

function App() {
  const [page, pageSetter] = useState(pages.PAGE_SHOPPING);
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
  const contextValueForContextPage = {
    page,
    pageSetter,
  };

  return (
    <div className="App">
      <ContextPageProvider value={contextValueForContextPage}>
        {renderPage(page)}
      </ContextPageProvider>
    </div>
  );
}

export { pages };
export default App;
