// server.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Dummy Routes (only include routes that don't require MongoDB)
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

// Use your route files
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);

// Test base route
app.get('/', (req, res) => {
  res.send('✅ Server is running without MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
