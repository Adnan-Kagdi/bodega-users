const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    // shippingAddress: {
    //   addressLine: String,
    //   city: String,
    //   state: String,
    //   pincode: String,
    //   phone: String,
    // },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentDetails: {
      razorpayPaymentId: String,
      razorpayOrderId: String,
      razorpaySignature: String,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled", "out_of_stock"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
