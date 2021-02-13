import { Consumer as PageContextConsumer } from "../../contexts/PageContext";
import { pages } from "../../App/App";

export default () => {
  return (
    <PageContextConsumer>
      {(value = {}) => {
        const { pageSetter = () => {} } = value;

        const onHandleButtonClick = () => {
          pageSetter(pages.PAGE_SHOPPING_CHECKOUT_RESULT);
        };

        return <button onClick={onHandleButtonClick}>change page</button>;
      }}
    </PageContextConsumer>
  );
};
