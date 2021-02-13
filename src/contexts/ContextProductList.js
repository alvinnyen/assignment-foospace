import { createContext } from "react";

const context = createContext({
  productList: "",
  setProductList: () => {},
});
export const { Provider, Consumer } = context;
export default context;
