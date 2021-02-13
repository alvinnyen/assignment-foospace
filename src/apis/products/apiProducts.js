const cloneDeep = require("lodash/cloneDeep");
const database = cloneDeep(require("./database.json"));

const apiGetProducts = () => {
  return new Promise((resolve) => {
    const mockApiCallForProducts = setTimeout(() => {
      resolve(cloneDeep(database));
      clearTimeout(mockApiCallForProducts);
    }, 0);
  });
};

export { apiGetProducts };
