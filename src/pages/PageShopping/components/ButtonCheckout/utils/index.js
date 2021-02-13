import cloneDeep from "lodash/cloneDeep";

const loadProduct = (productListArray = [], productsData = {}) => {
  return productListArray.map((productId = "", index) => {
    const { productName = "", productPrice = 0 } = productsData[productId];
    return {
      productId,
      productName,
      productPrice,
      positionInProducts: index,
    };
  });
};

const getCampaigns = () => {
  // maybe need to get campaigns from somewhere in the future
  const campaigns = {
    // TODO: check 名字在外還在內欄位好，欄位命名是否ＯＫ
    buyOneGetOneInHalfPrice: {
      desc: "同商品第 2 件 5 折",
      // processFunc: buyOneGetOneInHalfPrice,
    },
    reduceFiveDollarsForEveryProductWithThreeAnyProducts: {
      desc: "任意商品(可相同也可不同)滿 3 件以上每件皆折 5 元",
      // processFunc: reduceFiveDollarsForEveryProductWithThreeAnyProducts,
    },
  };
  return campaigns;
};

const getCampaignPriorities = () => {
  // maybe need to get campaign priorities from somewhere in the future
  const campaignsInPriorities = [
    "buyOneGetOneInHalfPrice",
    "reduceFiveDollarsForEveryProductWithThreeAnyProducts",
  ];
  return campaignsInPriorities;
};

const markProcessedForTheProducts = (productsHaveProcessed = []) =>
  productsHaveProcessed.forEach(
    (product = {}) => (product["processed"] = true)
  );

export default (productListArray = [], productsData = {}) => {
  const products = loadProduct(productListArray, productsData);
  const campaigns = getCampaigns();
  const campaignPriorities = getCampaignPriorities();
  let productsCloneDeeped = cloneDeep(products);

  console.log(campaignPriorities);
};
