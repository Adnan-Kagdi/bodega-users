const router = require("express").Router();
const { checkout } = require("../controllers/checkoutController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, checkout);

module.exports = router;
