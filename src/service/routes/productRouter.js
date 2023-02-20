const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController');

router.get('/products', productsController.showAllProducts);
router.get('/products/:id', productsController.findProduct);
router.post('/productsAdd', productsController.addProducts);
router.get('/productsDelete', productsController.productsDelete);
router.get('/products/edit/:id', productsController.productEdit);

module.exports = router;