const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const orderController = require("../controllers/orderController");

router.get('/', orderController.listOrders);
router.get('/:id', protect, orderController.getOrder);
router.post('/', protect, orderController.placeOrder);
router.put('/:id', protect, orderController.updateOrder);
router.delete('/:id', protect, orderController.deleteOrder);
router.put("/:statusID", protect, orderController.updateOrderStatus);

module.exports = router;


