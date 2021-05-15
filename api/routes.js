const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from Vending Machine!' });
});

const ProductController = require('./controllers/productController');
router.use('/products', ProductController);

module.exports = router;