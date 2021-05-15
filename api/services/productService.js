const fs = require('fs')

const ProductService = (() => {

  const getProducts = async () => {
    try {
      const products = fs.readFileSync('./data/product.json');
      return JSON.parse(products)
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return {
    getProducts
  }

})();

module.exports = ProductService;