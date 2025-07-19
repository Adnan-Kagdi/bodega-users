// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // define app here

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Server running ✅');
});

// Connect to MongoDB (optional for now)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
