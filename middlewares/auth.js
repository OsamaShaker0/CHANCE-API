const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const jwt = require('jsonwebtoken');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // Check if the Authorization header exists and starts with 'Bearer '
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.permission)) {
      throw new ErrorResponse(`Not authorized to access this route`, 403);
    }
    next();
  };
};
