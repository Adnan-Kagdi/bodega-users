const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/verify", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/login/verify", authController.verifyLoginOTP);

module.exports = router;
