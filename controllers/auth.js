const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

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
  res.status(201).json({ success: true, user: user, token });
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
  const isMatch = user.comparePasswords(password);
  if (!isMatch) {
    throw new ErrorResponse(`invalid credential`, 400);
  }
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, user: user, token });
});
