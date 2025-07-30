const Order = require('../models/Order');

// Create a new order (for testing)
exports.createOrder = async (req, res) => {
  try {
    const { product, amount } = req.body;
    const newOrder = new Order({ product, amount });
    await newOrder.save();
    res.status(201).json({ message: 'Order created', order: newOrder });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Could not create order' });
  }
};

// Update order payment status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;

  const validStatuses = ['pending', 'success', 'failed'];

  if (!validStatuses.includes(payment_status)) {
    return res.status(400).json({ error: 'Invalid payment status' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { payment_status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error('❌ Error updating order status:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
