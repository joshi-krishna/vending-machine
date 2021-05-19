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

router.get('/:id', (req, res) => {
  productService.purchageProduct(req.params.id, req.query.coin).then((product) => {
    httpRespsonse.success(res, product);
  }).catch((error) => {
    httpRespsonse.error(res, error);
  })
})

router.post('/:id', (req, res) => {
  productService.refundProduct(req.params.id, req.body).then((coin) => {
    httpRespsonse.success(res, coin);
  }).catch((error) => {
    httpRespsonse.error(res, error);
  })
})

module.exports = router;
