const axios = require('axios');

const sendOTP = async (phone, otp) => {
  try {
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const senderId = "MSGIND";

    const res = await axios.post("https://control.msg91.com/api/v5/otp", {
      mobile: phone,
      otp: otp,
      sender: senderId,
      authkey: MSG91_AUTH_KEY
    });

    return res.data;
  } catch (err) {
    throw new Error("Failed to send OTP");
  }
};

module.exports = sendOTP;
