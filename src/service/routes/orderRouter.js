const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
// need router in controller

router.get('/checkOut', orderController.displayCheckout);
router.post('/createCheckOut', orderController.createCheckout);
module.exports = router;