const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
// need router in controller

router.get('/checkOut', orderController.displayAllCheckout);
router.post('/createCheckOut', orderController.createCheckout);
router.put('/saveCheckOut/:id', orderController.updateCheckoutStatus);
module.exports = router;