const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/user", userRoutes); // User routes
app.use("/api/cart", cartRoutes); //cart routes
app.use("/api/checkout", checkoutRoutes); // Checkout routes

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
