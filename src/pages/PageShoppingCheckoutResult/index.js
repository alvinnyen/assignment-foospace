import { useContext } from "react";

import Table from "./components/Table";
import ButtonBack from "./components/ButtonBack";

import contextProcessedProducts from "../../contexts/ContextProcessedProducts";

export default () => {
  const { processedProducts = [] } = useContext(contextProcessedProducts);

  const columnWidths = ["10%", "10%", "10%", "10%", "60%"];
  const headerColumns = ["#", "ID", "原價", "活動價", ""];

  const getCampaignWording = (data = {}) => {
    const { campaign = "", related = [] } = data;
    if (related.length) {
      return `與第${related.join("、")}項組合成${campaign}`;
    }
    return campaign;
  };
  const dataRows = processedProducts.map((processedProduct = {}, index) => {
    const {
      campaign = "",
      productId = "",
      productPrice = 0,
      related = [],
      discount = 0,
    } = processedProduct;

    const campaignWording = getCampaignWording({
      campaign,
      related,
    });

    // "#", "ID", "原價", "活動價", ""
    return [
      index + 1 + "",
      productId,
      productPrice,
      productPrice - discount,
      campaignWording,
    ];
  });

  const total = processedProducts.reduce((accuTotal = 0, product = {}) => {
    const { productPrice = 0, discount = 0 } = product;
    return (accuTotal += productPrice - discount);
  }, 0);
  const totalWithTheWording = `價格為$${total}`;

  return (
    <div>
      <div>PageShoppingCheckoutResult</div>
      <Table
        columnWidths={columnWidths}
        headerColumns={headerColumns}
        dataRows={dataRows}
      />
      <div>{totalWithTheWording}</div>
      <ButtonBack />
    </div>
  );
};
