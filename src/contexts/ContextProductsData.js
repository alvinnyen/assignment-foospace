import { createContext } from "react";

const context = createContext({
  productsData: {},
  setProductsData: () => {},
});
export const { Provider, Consumer } = context;
export default context;
