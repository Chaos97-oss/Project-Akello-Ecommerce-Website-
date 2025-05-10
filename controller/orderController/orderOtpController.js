import generateOtp from "../../utils/generateOtp.js";
import sendOtpEmail from "../../utils/sendOtpEmail.js";
import User from "../../models/User.js";

// Send OTP for order
export const sendOrderOtp = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { otp, expiry } = generateOtp();

    user.orderOtp = otp;
    user.orderOtpExpiry = expiry;
    await user.save();

    await sendOtpEmail(user.email, otp);

    res.status(200).json({ message: "OTP sent to your email for order confirmation" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

// Verify OTP for order
export const verifyOrderOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || !user.orderOtp || user.orderOtp !== otp || user.orderOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.orderOtp = undefined;
    user.orderOtpExpiry = undefined;
    user.orderOtpVerified = true;
    await user.save();

    res.status(200).json({ message: "Order OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "OTP verification failed", error });
  }
};