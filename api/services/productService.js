const fs = require('fs');
const {
  DATA_FILE,
  MESSAGE_OUT_OF_STOCK,
  MESSAGE_NOT_PURCHASED,
  MESSAGE_REFUND_SUCCESS,
  MESSAGE_PURCHASE_SUCCESS,
  MESSAGE_NOT_ENOUGH_MONEY,
} = require('../constants');

const ProductService = (() => {

  const getProducts = async () => {
    try {
      const products = fs.readFileSync(DATA_FILE);
      return JSON.parse(products);
    } catch (error) {
      throw error;
    }
  };

  const purchageProduct = async (id, coinAmount = 0, cash = null) => {
    try {
      const res = fs.readFileSync(DATA_FILE);
      let data = JSON.parse(res);
      let returnedMoney = 0;
      let product = data.products.find(x => x.id == id);
      if (product.price > coinAmount)
        return { product: null, message: MESSAGE_NOT_ENOUGH_MONEY };
      if (product.stock == 0)
        return { product: null, message: MESSAGE_OUT_OF_STOCK };
      if (product.price <= coinAmount) {
        returnedMoney = caluclateChange(coinAmount, product.price);
        product.stock = product.stock - 1;
        writeDataFile(data, product);
      }
      return { message: `${MESSAGE_PURCHASE_SUCCESS} ${product.name}`, product, returnedMoney };
    } catch (error) {
      throw { product: null, message: error };
    }
  };

  const refundProduct = async (id, product) => {
    try {
      const res = fs.readFileSync(DATA_FILE);
      let data = JSON.parse(res);
      let product = data.products.find(x => x.id == id);
      if (product.stock == 10)
        return { message: `${MESSAGE_NOT_PURCHASED} ${product.name}`, stock: null, returnedMoney: 0 };
      product.stock = product.stock + 1;
      writeDataFile(data, product);
      return { message: `${MESSAGE_REFUND_SUCCESS} ${product.name}`, stock: product.stock, returnedMoney: product.price };
    } catch (error) {
      throw { product: null, message: error };
    }
  };

  const caluclateChange = (inputMoney, actualPrice) => {
    return inputMoney - actualPrice;
  };

  const writeDataFile = (data, product) => {
    let index = findIndex(data.products, product.id);
    data.products[index] = product;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  };

  const findIndex = (collection, id) => {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
  };

  return {
    getProducts,
    purchageProduct,
    refundProduct
  }
})();

module.exports = ProductService;
