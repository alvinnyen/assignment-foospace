import cloneDeep from "lodash/cloneDeep";

/**
 *
 * @param {Array} productListArray The value from productList.split(',')
 * example of productListArray
 * => ['003', '001', '003', '004', '001']
 *
 * @param {Object} productsData Products in product ids.
 * example of productsData
 * => {
 *  001: {productName: "Cola", productPrice: 45}
 *  002: {productName: "Royal", productPrice: 50}
 *  003: {productName: "Sprite", productPrice: 55}
 *  004: {productName: "Fanta", productPrice: 60}
 *  005: {productName: "Lemon Tea", productPrice: 35}
 * }
 *
 * @returns {Array} Returns products array.
 * @example
 * example of products
 * => [{
 *   positionInProducts: 1
 *   productId: "002"
 *   productName: "Royal"
 *   productPrice: 50
 * },
 * {
 *   positionInProducts: 1
 *   productId: "002"
 *   productName: "Royal"
 *   productPrice: 50
 * }]
 */
const loadProducts = (productListArray = [], productsData = {}) => {
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

const getCampaignPriorities = () => {
  // maybe need to get campaign priorities from somewhere in the future
  const campaignsInPriorities = [
    "buyOneGetOneInHalfPrice",
    "reduceFiveDollarsForEveryProductWithThreeAnyProducts",
  ];
  return campaignsInPriorities;
};

function buyOneGetOneInHalfPrice(productsToProcess = [], campaign = "") {
  const getProductsGroupByProductId = (productsToProcess = []) => {
    return (
      productsToProcess.reduce(
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
      ) || {}
    );
  };
  const productsGroupByProductId = getProductsGroupByProductId(
    productsToProcess
  );
  const productsToProcessWithCampaignRule = [];

  for (let productId in productsGroupByProductId) {
    const productsInProductId = productsGroupByProductId[productId] || [];
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
    const curProduct = productsToProcessWithCampaignRule[i] || {};
    const nexProduct = productsToProcessWithCampaignRule[i + 1] || {};

    [curProduct, nexProduct].forEach(
      (product = {}) => (product.campaign = campaign)
    );

    // related array for Current Product
    curProduct.related = nexProduct.positionInProducts && [
      nexProduct.positionInProducts,
    ];

    // discount for Next Product
    nexProduct.discount = nexProduct.productPrice / 2;
  }

  return productsToProcessWithCampaignRule;
}

function reduceFiveDollarsForEveryProductWithThreeAnyProducts(
  productsToProcess = [],
  campaign = ""
) {
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

    chunkInThreeProducts.forEach((product = {}) => {
      product.campaign = campaign;
      product.discount = 5;
    });

    // need the related field in firProduct
    const firProduct = chunkInThreeProducts[0] || {};
    const secProduct = chunkInThreeProducts[1] || {};
    const thiProduct = chunkInThreeProducts[2] || {};
    firProduct.related = secProduct.positionInProducts &&
      thiProduct.positionInProducts && [
        secProduct.positionInProducts,
        thiProduct.positionInProducts,
      ];
  }

  return productsToProcessWithCampaignRule;
}

const utilGetProcessedProducts = (productListArray = [], productsData = {}) => {
  const products = loadProducts(productListArray, productsData) || [];
  const campaigns = getCampaigns() || {};
  const campaignPriorities = getCampaignPriorities() || [];
  let productsCloneDeeped = cloneDeep(products) || [];
  const markProcessedForTheProducts = (productsHaveProcessed = []) =>
    productsHaveProcessed.forEach(
      (product = {}) => (product["processed"] = true)
    );
  campaignPriorities.forEach((campaign = "", index) => {
    const productsToProcess = productsCloneDeeped.filter(
      (product = {}) => !product["processed"]
    );
    const campaignNo = index + 1;
    const campaignWording = "優惠活動 " + (campaignNo || "");

    // unify the interface for $campaign.processFunc
    //    => (productsToProcess = [], campaign = ''): (productsHaveProcessed =[])
    // so that can iterate campaigns and apply the processFunc
    const productsHaveProcessed =
      (productsToProcess.length &&
        campaigns[campaign].processFunc(productsToProcess, campaignWording)) ||
      [];
    markProcessedForTheProducts(productsHaveProcessed);
  });

  return productsCloneDeeped || [];
};

export default utilGetProcessedProducts;
