import { useState, useEffect } from "react";

import PageShopping from "../pages/PageShopping";
import PageShoppingCheckoutResult from "../pages/PageShoppingCheckoutResult";
import Composer from "./hocs/Composer";

import { apiGetProducts } from "../apis/products/apiProducts";

import { Provider as ContextPageProvider } from "../contexts/ContextPage";
import { Provider as ContextProductsProvider } from "../contexts/ContextProducts";
import { Provider as ContextProductsDataProvider } from "../contexts/ContextProductsData";
import { Provider as ContextProcessedProductsProvider } from "../contexts/ContextProcessedProducts";

const pages = {
  PAGE_SHOPPING: "PAGE_SHOPPING",
  PAGE_SHOPPING_CHECKOUT_RESULT: "PAGE_SHOPPING_CHECKOUT_RESULT",
};

function App() {
  const [page, setPage] = useState(pages.PAGE_SHOPPING);
  const [processedProducts, setProcessedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const getProductsAndProductsData = async () => {
      const { products: productsFromApi = {} } = await apiGetProducts();
      const products = [];
      const productsData = {};

      for (let productId in productsFromApi) {
        const {
          name: productName = "",
          price: productPrice = 0,
        } = productsFromApi[productId];

        // ensure the fields of a product from api/database are fine,
        // then push it to the products array,
        // so that can be rendered properly later
        productName &&
          productPrice > 0 &&
          products.push({
            productId,
            productName,
            productPrice,
          }) &&
          (productsData[productId] = { productName, productPrice });
      }
      setProducts(products);
      setProductsData(productsData);
    };
    getProductsAndProductsData();
  }, []);

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
    {
      contextProvider: ContextProductsProvider,
      contextValue: {
        products,
        setProducts,
      },
    },
    {
      contextProvider: ContextProductsDataProvider,
      contextValue: {
        productsData,
        setProductsData,
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
