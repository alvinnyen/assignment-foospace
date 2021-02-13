import { createContext } from "react";

const context = createContext({
  page: "",
  setPage: () => {},
});
export const { Provider, Consumer } = context;
export default context;
