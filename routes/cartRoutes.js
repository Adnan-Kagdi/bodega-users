const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Example middleware to fake login (replace with real auth later)
router.use((req, res, next) => {
  req.user = { id: 'demo-user-id' }; // use real user ID in production
  next();
});

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/:itemId', cartController.updateCartItem);
router.delete('/:itemId', cartController.removeCartItem);

module.exports = router;
