import generateOtp from '../../utils/generateOtp.js';
import sendOtpEmail from '../../utils/sendOtpEmail.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/AppError.js';
import User from '../../models/User.js';

export const sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found', 404));

  const { otp, expiry } = generateOtp();
  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();

  await sendOtpEmail(email, otp);

  res.status(200).json({ status: 'success', message: 'OTP sent to your email' });
});

export const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found', 404));

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
});
