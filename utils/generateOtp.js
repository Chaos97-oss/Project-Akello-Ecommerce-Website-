const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return { otp, expiry };
};

export default generateOtp;
