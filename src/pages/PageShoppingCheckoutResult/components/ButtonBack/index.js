import { useContext } from "react";

import { pages } from "../../../../App/App";

import contextPage from "../../../../contexts/ContextPage";

export default () => {
  const { setPage = () => {} } = useContext(contextPage);

  const handleButtonBackClick = () => {
    setPage(pages.PAGE_SHOPPING);
  };

  return <button onClick={handleButtonBackClick}>Back</button>;
};
