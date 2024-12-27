const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    get all users
// @route   GET/api/v1/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select('name email role industry');

  res.status(200).json({ success: true, numOfUsers: users.length, users });
});
// @desc    get single user
// @route   GET/api/v1/users/:id
// @access  Public
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let user = await User.findById(id).select('name email role industry');
  if (!user) {
    throw new ErrorResponse(`there are no user with id of ${id}`, 404);
  }
  res.status(200).json({ success: true, user });
});
// @desc    Update User
// @route   PUT/api/v1/users/:id
// @access  private(admin or person him self)
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select('name email role industry');
  res.status(200).json({ success: true, updatedUser });
});
// @desc    delete User
// @route   DELETE/api/v1/users/:id
// @access  private(admin or person him self)
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findByIdAndDelete(id).select(
    'name email role industry'
  );
  res.status(200).json({ success: true, deletedUser });
});
