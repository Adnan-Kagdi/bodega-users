const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const razorpay = require('../config/razorpay');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    for (let item of cart.items) {
      const product = item.productId;
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${product?.title || 'Unknown'} is out of stock.` });
      }
      totalAmount += product.price * item.quantity;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `order_rcptid_${req.user.id}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      razorpayOrder: order,
      totalAmount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
};
