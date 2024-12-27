const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

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
  const userId = req.user._id;
  let user = await User.findById(id);
  if (
    userId.toString() !== user._id.toString() &&
    user.permission !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select('name email role industry');
  return res.status(200).json({ success: true, updatedUser: user });
});
// @desc    delete User
// @route   DELETE/api/v1/users/:id
// @access  private(admin or person him self)
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  let user = await User.findById(id);
  if (
    userId.toString() !== user._id.toString() &&
    user.permission !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  //FIXME -  DO NOT FORGET TO DELETE ALL POSTS BEFORE DELETE
  user = await User.findByIdAndDelete(id).select('name email role industry');
  res.status(200).json({ success: true, deletedUser: user });
});

exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  let user = await User.findById(id);
  if (userId.toString() !== user._id.toString()) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  if (!req.files) {
    return next(new ErrorResponse(`please upload a photo`), 400);
  }
  const file = req.files.file;
  // check that file is image
  if (!file.mimetype.startsWith('image')) {
    throw new ErrorResponse(`please upload an image file`, 400);
  }
  // craete filename
  file.name = `photo${user._id}${path.parse(file.name).ext}`;
  // upload file
  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      throw new ErrorResponse(`Problem with file uplaod =>${err}`, 500);
    }
    await User.findByIdAndUpdate(id, { photo: file.name }, { new: true });
    return res.status(200).json({ sucess: true, data: file.name });
  });
});
