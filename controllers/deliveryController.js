// controllers/deliveryController.js

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // TODO: Update DB (if needed)
    console.log(" Delivery status update received:", { orderId, status });

    // Emit Socket.IO event globally
    io.emit("deliveryUpdated", { orderId, status });

    return res.status(200).json({ message: "Delivery status updated" });
  } catch (err) {
    console.error(" Error updating delivery:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
