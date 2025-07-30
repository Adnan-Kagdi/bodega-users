const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const item = cart.items.id(itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.items = cart.items.filter(item => item.id !== itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
