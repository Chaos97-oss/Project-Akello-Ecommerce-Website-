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

  // console.log("Stored OTP:", user.otp);
  // console.log("Submitted OTP:", otp);
  // console.log("Expiry Time:", user.otpExpiry, "| Now:", new Date());

  if (
    !otp ||
    String(user.otp) !== String(otp) ||
    new Date(user.otpExpiry) < new Date()
  ) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  user.isVerified = true; //mark as verified
  await user.save();

  res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
});
