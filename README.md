# assignment-foospace

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Run `npm start` to run this app in the development mode, then you can view it by opening [http://localhost:3000](http://localhost:3000) in the browser.

## Assumptions

- for each product
  - product id: `/[0-9]{3}/g`
  - product name: !null && !undefined && !''
  - product price: !null && !undefined && > 0

## Error handling

1. For ==Components== contain props, use prop-types to do runtime type checking for React props and similar objects.

   - use prop-types to document the intended types of properties passed to components and warn in development if they don’t match.
   - see Product and Table Component

2. Filter and make sure ==the data from api== have necessary values
   2.1. make sure the format of product id match the assumption above. - i.e. `if (!regForProductId.test(productId)) continue;`
   2.2. make sure the product name and price are not empty and the price must above 0 - i.e.
   `productName && productPrice > 0 && products.push({ productId, productName, productPrice, }) && (productsData[productId] = { productName, productPrice });`
   2.3. ==with point 2.1., we can make sure everything will be well later in the process, and don't need to have too many conditional statements or error handlings in the later process or it will decrease readability==

3. With the point 2, we can get the ==products array== contains everything/every field we need and make sure we can render it (renderProducts) properly on the PageShopping as `[Product]`

4. Do the check for the product list, and disable the checkout button if !productList.

- i.e.
  - `const buttonDisabled = !productList;`
  - `<button disabled={buttonDisabled} ...`

5. For campaigns and related utils.

- 5.1. With the point 2, 3, and 4, we can have confident with the product related data, and don't need to have too many conditional statements or error handlings in the later process or it will decrease readability, so that we can focus on dealing with the processes of campaigns.
- 5.2. Instead of having too many conditional statements or error handlings, use || to set the default values to avoid decreasing readability.

6. Apply 5.2. in whole project.

## Design of campaign process

- Unify the interface for `$campaign.processFunc` like `(productsToProcess = [], campaign = ''): (productsHaveProcessed =[])`, so that can iterate campaigns and apply the processFunc and will be ok if there is any change in ==campaignsInPriorities== (i.e. adjust campaign priority, add other campaigns into it).
- The example of campaignsInPriorities.

```
const campaignsInPriorities = [
    "buyOneGetOneInHalfPrice",
    "reduceFiveDollarsForEveryProductWithThreeAnyProducts",
];
```

## Example of data shape.

### in the util file

#### productListArray

- The value from productList.split(',').
- `['003', '001', '003', '004', '001']`

#### productsData

```
{
   001: {productName: "Cola", productPrice: 45}
   002: {productName: "Royal", productPrice: 50}
   003: {productName: "Sprite", productPrice: 55}
   004: {productName: "Fanta", productPrice: 60}
   005: {productName: "Lemon Tea", productPrice: 35}
  }
```

#### products && productsCloneDeeped

- productsData, the initial value of productsCloneDeeped

```
{
   {
        positionInProducts: 1,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
   },
   {
        positionInProducts: 2,
        productId: "002",
        productName: "Royal",
        productPrice: 50,
   },
   {
        positionInProducts: 3,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
   },
   {
        positionInProducts: 4,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
   },
   {
        positionInProducts: 5,
        productId: "004",
        productName: "Fanta",
        productPrice: 60,
   },
  }
```

- the final result after processing of ==productsCloneDeeped==

```
{
   {
       campaign: "優惠活動 1"
        positionInProducts: 1,
        processed: true,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
        related: [3],
   },
   {
       campaign: "優惠活動 2",
        discount: 5,
        positionInProducts: 2,
        processed: true,
        productId: "002",
        productName: "Royal",
        productPrice: 50,
        related: [4, 5],
   },
   {
       campaign: "優惠活動 1",
        discount: 27.5,
        positionInProducts: 3,
        processed: true,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
   },
   {
       campaign: "優惠活動 2",
        discount: 5,
        positionInProducts: 4,
        processed: true,
        productId: "003",
        productName: "Sprite",
        productPrice: 55,
   },
   {
       campaign: "優惠活動 2",
        discount: 5,
        positionInProducts: 5,
        processed: true,
        productId: "004",
        productName: "Fanta",
        productPrice: 60,
   },
  }
```
