const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/sendOtp");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const userExists = await User.findOne({ phone });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const otp = generateOtp();
    await sendOtp(phone, otp);

    const user = await User.create({ firstName, lastName, phone, otp });
    res.status(200).json({ message: "OTP sent successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user || user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "OTP verified", token });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (!user.isVerified) return res.status(400).json({ message: "User not verified" });

    const otp = generateOtp();
    user.otp = otp;
    await user.save();
    await sendOtp(phone, otp);

    res.status(200).json({ message: "OTP sent", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
