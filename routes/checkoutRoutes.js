const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Same fake middleware (replace later)
router.use((req, res, next) => {
  req.user = { id: 'demo-user-id' };
  next();
});

router.post('/', checkoutController.checkout);

module.exports = router;
