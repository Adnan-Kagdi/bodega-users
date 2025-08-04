const User = require("../models/userModel");
const sendOTP = require("../utils/sendOTP");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    let user = await User.findOne({ phone });

    const otp = generateOTP();
    await sendOTP(phone, otp);

    if (user) {
      user.otp = otp;
      await user.save();
      return res.status(200).json({ message: "OTP sent again. Please verify." });
    }

    const newUser = await User.create({ firstName, lastName, phone, otp });
    res.status(201).json({ message: "User registered. Please verify OTP." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) return res.status(404).json({ message: "User not found." });
    if (!user.isVerified) return res.status(403).json({ message: "User not verified." });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();
    await sendOTP(phone, otp);

    res.status(200).json({ message: "OTP sent to login." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyLoginOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.otp = null;
    await user.save();

    res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
