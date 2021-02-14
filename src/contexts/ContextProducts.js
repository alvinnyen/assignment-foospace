import { createContext } from "react";

const context = createContext({
  products: [],
  setProducts: () => {},
});
export const { Provider, Consumer } = context;
export default context;
