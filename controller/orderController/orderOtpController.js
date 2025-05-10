import generateOtp from '../../utils/generateOtp.js';
import sendOtpEmail from '../../utils/sendOtpEmail.js';
import User from '../../models/User.js';

export const sendOrderOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found', 404));

  const { otp, expiry } = generateOtp();
  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();

  await sendOtpEmail(email, otp);

  res.status(200).json({ status: 'success', message: 'OTP sent for order confirmation' });
});