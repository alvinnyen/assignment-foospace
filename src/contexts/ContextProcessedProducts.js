import { createContext } from "react";

const context = createContext({
  processedProducts: [],
  setProcessedProducts: () => {},
});
export const { Provider, Consumer } = context;
export default context;
