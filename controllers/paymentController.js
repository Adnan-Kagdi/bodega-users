// controllers/paymentController.js

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // TODO: Update DB (if needed)
    console.log(" Payment status update received:", { orderId, status });

    // Emit Socket.IO event globally
    io.emit("paymentUpdated", { orderId, status });

    return res.status(200).json({ message: "Payment status updated" });
  } catch (err) {
    console.error(" Error updating payment:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
