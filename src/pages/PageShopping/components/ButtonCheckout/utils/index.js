import cloneDeep from "lodash/cloneDeep";

const loadProduct = (productListArray = [], productsData = {}) => {
  return productListArray.map((productId = "", index) => {
    const { productName = "", productPrice = 0 } = productsData[productId];
    return {
      productId,
      productName,
      productPrice,
      positionInProducts: index + 1,
    };
  });
};

const getCampaigns = () => {
  // maybe need to get campaigns from somewhere in the future
  const campaigns = {
    // TODO: check 名字在外還在內欄位好，欄位命名是否ＯＫ
    buyOneGetOneInHalfPrice: {
      desc: "同商品第 2 件 5 折",
      processFunc: buyOneGetOneInHalfPrice,
    },
    reduceFiveDollarsForEveryProductWithThreeAnyProducts: {
      desc: "任意商品(可相同也可不同)滿 3 件以上每件皆折 5 元",
      processFunc: reduceFiveDollarsForEveryProductWithThreeAnyProducts,
    },
  };
  return campaigns;
};

function buyOneGetOneInHalfPrice(productsToProcess = [], campaignNo = 0) {
  const campaign = "優惠活動" + campaignNo;
  const getProductsGroupByProductId = (productsToProcess = []) => {
    return productsToProcess.reduce(
      (productsGroupByProductId = {}, product = {}) => {
        const { productId = "" } = product;
        if (!productsGroupByProductId[productId]) {
          productsGroupByProductId[productId] = [product];
        } else {
          productsGroupByProductId[productId].push(product);
        }

        return productsGroupByProductId;
      },
      {}
    );
  };
  const productsGroupByProductId = getProductsGroupByProductId(
    productsToProcess
  );
  const productsToProcessWithCampaignRule = [];

  for (let productId in productsGroupByProductId) {
    const productsInProductId = productsGroupByProductId[productId];
    if (productsInProductId.length < 2) continue;
    if (productsInProductId.length % 2 === 0) {
      productsToProcessWithCampaignRule.push(...productsInProductId.splice(0));
    } else {
      productsToProcessWithCampaignRule.push(
        ...productsInProductId.splice(0, productsInProductId.length - 1)
      );
    }
  }

  for (let i = 0; i < productsToProcessWithCampaignRule.length; i += 2) {
    const curProduct = productsToProcessWithCampaignRule[i];
    const nexProduct = productsToProcessWithCampaignRule[i + 1];

    // related array for Current Product
    curProduct.campaign = campaign;
    curProduct.related = [nexProduct.positionInProducts];

    // discount for Next Product
    nexProduct.campaign = campaign;
    nexProduct.discount = nexProduct.productPrice / 2;
  }

  return productsToProcessWithCampaignRule;
}

function reduceFiveDollarsForEveryProductWithThreeAnyProducts(
  productsToProcess = [],
  campaignNo = 0
) {
  const campaign = "優惠活動" + campaignNo;
  const productsToProcessLength = productsToProcess.length;
  const productsToProcessWithCampaignRule = productsToProcess.slice(
    0,
    productsToProcessLength - (productsToProcessLength % 3)
  );

  for (
    let index = 0;
    index < productsToProcessWithCampaignRule.length;
    index += 3
  ) {
    const chunkInThreeProducts = productsToProcessWithCampaignRule.slice(
      index,
      index + 3
    );

    // the first product
    const firProduct = chunkInThreeProducts[0];
    // the second product
    const secProduct = chunkInThreeProducts[1];
    // the third product
    const thiProduct = chunkInThreeProducts[2];

    // the first product
    firProduct.campaign = campaign;
    firProduct.discount = 5;
    firProduct.related = [
      secProduct.positionInProducts,
      thiProduct.positionInProducts,
    ];

    // the second product
    secProduct.campaign = campaign;
    secProduct.discount = 5;

    // the third product
    thiProduct.campaign = campaign;
    thiProduct.discount = 5;
  }

  return productsToProcessWithCampaignRule;
}

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

const utilGetProcessedProducts = (productListArray = [], productsData = {}) => {
  const products = loadProduct(productListArray, productsData);
  const campaigns = getCampaigns();
  const campaignPriorities = getCampaignPriorities();

  let productsCloneDeeped = cloneDeep(products);
  campaignPriorities.forEach((campaign = "", index) => {
    const productsToProcess = productsCloneDeeped.filter(
      (product = {}) => !product["processed"]
    );
    const campaignNo = index + 1;
    const productsHaveProcessed = campaigns[campaign].processFunc(
      productsToProcess,
      campaignNo
    );
    markProcessedForTheProducts(productsHaveProcessed);
  });

  return productsCloneDeeped;
  // const total = productsCloneDeeped.reduce((accuTotal = 0, product = {}) => {
  //   const { productPrice = 0, discount = 0 } = product;
  //   return (accuTotal += productPrice - discount);
  // }, 0);
  // return total;
};

export default utilGetProcessedProducts;
