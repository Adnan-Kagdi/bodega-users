const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if using Auth
    required: true
  },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
