const Router = require('express').Router;
const router = Router();
const productService = require('../services/productService');
const httpRespsonse = require('../utility/httpResponse');

router.get('/', (req, res) => {
  productService.getProducts().then((products) => {
    httpRespsonse.success(res, products);
  }).catch((error) => {
    httpRespsonse.error(res, error);
  })
})

module.exports = router;