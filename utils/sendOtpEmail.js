import nodemailer from 'nodemailer';

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or mailtrap during dev
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,//logic corrected and tested
    },
  });

  await transporter.sendMail({
    from: '"E-commerce Support" <support@ecommerce.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
  });
};

export default sendOtpEmail;
