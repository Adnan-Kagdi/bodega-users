const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(express.json());

// ✅ Replace 'your_db_name' with actual DB name
mongoose.connect('mongodb+srv://tejaswininaru138:wAzxVCdrWU0RK9qB@cluster0.9dyyal7.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
