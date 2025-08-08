const Razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

exports.createRazorpayOrder = async (req, res) => {
  const { totalAmount, currency = "INR" } = req.body;

  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await Razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed", error: err });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    orderId,
  } = req.body;

  const sign = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature === razorpaySignature) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "paid",
        paymentDetails: {
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        },
      },
      { new: true }
    );
    res.json({ success: true, message: "Payment verified", order });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};

exports.markPaymentSuccess = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentStatus = 'success';
    order.orderStatus = 'processing';
    await order.save();

    res.json({ message: 'Payment successful, order updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

