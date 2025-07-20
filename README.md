# 🛒 Bodega Backend API

This is a full-featured RESTful backend server built with **Node.js**, **Express**, and **MongoDB**. It supports:
- 🔐 JWT-based User Authentication
- 👤 User Profile retrieval
- 📦 Product Management (CRUD)
- 🧾 Order Management (CRUD)
- 🛡️ Route Protection using Middleware

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Adnan-Kagdi/bodega-users.git
cd bodega-users

# 2. Install dependencies
npm install

# 3. Add environment variables
touch .env

# Add the following to .env file:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

# 4. Start the server
node server.js