// const twilio = require('twilio');
// require('dotenv').config();

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// /**
//  * Sends OTP to given phone number using Twilio SMS
//  * @param {string} phone - User's phone number (with country code, e.g., +91XXXXXXXXXX)
//  * @param {string} otp - The 6-digit OTP to send
//  */
// const sendOtp = async (phone, otp) => {
//   try {
//     const message = await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER, // Must be a verified Twilio number
//       to: phone,
//     });
//     console.log("OTP sent successfully:", message.sid);
//   } catch (error) {
//     console.error("Error sending OTP:", error.message);
//     throw new Error("Failed to send OTP");
//   }
// };

// module.exports = sendOtp;

