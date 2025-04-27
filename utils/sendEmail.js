import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create transporter (Gmail example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Email options
  const mailOptions = {
    from: 'Akello <noreply@Akello.com>', // You can change this
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
