const nodemailer = require('nodemailer');
require('dotenv').config()
const ErrorResponse = require('./errorResponse');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS
    },
  });
  let message = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  try {
    await transporter.sendMail(message);
    console.log(`email has sent successfuly to ${message.to}`);
  } catch (error) {
    throw new ErrorResponse(error, 500);
  }
};
module.exports = sendEmail




