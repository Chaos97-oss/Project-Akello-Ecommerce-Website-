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
    text: `Your OTP code is: ${otp}\n\nThis code will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
        <p style="font-size: 16px;">Use the following code to verify your identity:</p>
        <div style="background: #f4f4f4; padding: 10px; margin: 20px 0; font-size: 24px; letter-spacing: 2px; text-align: center;">
          <strong>${otp}</strong>
        </div>
        <p style="font-size: 14px; color: #666;">This code is valid for 10 minutes only.</p>
      </div>
    `
  });
};

export default sendOtpEmail;
