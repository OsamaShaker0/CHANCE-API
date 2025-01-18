const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/seneEmail');
const Logger = require('../services/logger.service');
const logger = new Logger('authController');

// @desc      register user
// @route     POST api/v1/users/auth/register
// @access    public
exports.register = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw new ErrorResponse(
      `user with email of { ${email} } is already exsit`,
      400
    );
  }
  user = await User.create(req.body);

  const token = user.getSignedJwtToken();
  logger.info('the new user is register ');
  res.status(201).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      industry: user.industry,
      role: user.role,
    },
    token,
  });
});
// @desc      login user
// @route     POST api/v1/users/auth/login
// @access    public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorResponse(`please enter your email and password`, 400);
  }

  let user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse(`invalid credential`, 400);
  }

  const isMatch = await user.compare(password);

  if (!isMatch) {
    throw new ErrorResponse(`invalid credential`, 400);
  }
  const token = user.getSignedJwtToken();
  user.resetPassword = 'No code';
  user.save();
  logger.info(`the user ${user.email} is logged `);
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      industry: user.industry,
      role: user.role,
    },
    token,
  });
});

// @desc      forgetPassowrd user
// @route     POST api/v1/users/auth/forgetpassword
// @access    public
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ErrorResponse('please write your email account ', 400);
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse('invalid credentials ', 400);
  }
  let code = user.resetPass();
  let url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/auth/${email}/resetpassword`;

  let options = {
    from: 'oelgrem@hamil.com',
    to: email,
    subject: `reset password code `,
    text: `
     code is   ${code}
      
     use url to reset password   ${url}

    
  `,
  };
  try {
    await sendEmail(options);
    return res.status(200).json({ success: true, data: 'Email sent ' });
  } catch (err) {
    console.log(err);
    user.resetPassword = undefined;

    throw new ErrorResponse(`email could not be sent`, 500);
  }
});

// @desc      resetPassword user
// @route     POST api/v1/users/auth/resetpassword
// @access    public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const email = req.params.email;
  const { code, newPassword } = req.body;
  if ((!code || !newPassword, !email)) {
    throw new ErrorResponse(`Bad request `, 400);
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse('invalid credentials ', 400);
  }

  if (user.resetPassword !== code) {
    throw new ErrorResponse(
      'wrong code ,please make sure that is correct code ',
      400
    );
  }
  user.password = newPassword;
  user.resetPassword = 'No code';
  user.save();
  return res.status(200).json({ success: true, msg: `password updated` });
});
