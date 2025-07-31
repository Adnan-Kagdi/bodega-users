const Order = require("../models/orderModel");

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customerName, product, quantity } = req.body;

    if (!customerName || !product || !quantity) {
      return res.status(400).json({
        error: "All fields (customerName, product, quantity) are required.",
      });
    }

    const newOrder = new Order({
      customerName,
      product,
      quantity,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: "Failed to create order" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { customerName, product, quantity } = req.body;

    if (
      !customerName ||
      !product ||
      typeof quantity !== "number" ||
      quantity < 1
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, product, quantity },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: "Failed to update order" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { statusID } = req.params;
  const { paymentStatus } = req.body;

  const validStatuses = ["pending", "success", "failed"];

  if (!validStatuses.includes(paymentStatus)) {
    return res.status(400).json({ error: "Invalid payment status" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      statusID,
      { paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Server error" });
  }
};
