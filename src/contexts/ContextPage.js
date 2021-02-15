import { createContext } from "react";

const context = createContext({
  page: {
    pageName: "",
    pageError: "",
  },
  setPage: () => {},
});
export const { Provider, Consumer } = context;
export default context;
