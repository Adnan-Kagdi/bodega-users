const Cart = require('../models/cart');
const Product = require('../models/productModel');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = 0;
    for (let item of cart.items) {
      const product = item.productId;
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${product?.name || 'Unknown'} is out of stock or missing.` });
      }
      total += product.price * item.quantity;
    }

    res.status(200).json({
      message: 'Checkout success',
      totalPrice: total,
      items: cart.items
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
