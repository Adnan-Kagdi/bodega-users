const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {listOrders, getOrder, createOrder, updateOrder, deleteOrder} = require("../controllers/orderController");

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', protect, createOrder);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;


