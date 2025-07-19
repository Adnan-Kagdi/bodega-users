//routes/orderroutes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/orders', controller.listOrders);
router.get('/orders/:id', controller.getOrder);
router.post('/orders', controller.createOrder);
router.put('/orders/:id', controller.updateOrder);
router.delete('/orders/:id', controller.deleteOrder);

module.exports = router;


