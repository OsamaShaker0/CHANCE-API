const nodemailer = require('nodemailer');
const ErrorResponse = require('./errorResponse');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `oelgrem@gmail.com`,
      pass: `fokwfioummpshuvm`,
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




