const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const Chance = require('../models/Chance');

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
  if (!user) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  if (
    userId.toString() !== user._id.toString() &&
    req.user.permission !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  const password = req.body.password;
  if (password) {
    return next(
      new ErrorResponse(`Can not update password from this route `, 401)
    );
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

  if (!user) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }
  if (
    userId.toString() !== user._id.toString() &&
    req.user.permission !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authrized to access this route `, 401));
  }

  await Chance.deleteMany({ user: id });
  user = await User.findByIdAndDelete(id).select('name email role industry');
  res.status(200).json({ success: true, deletedUser: user });
});
// @desc   upload photo
// @route   PUT/api/v1/users/:id/uploadphoto
// @access  private(admin or person him self)
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  let user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse(`No user with id of ${userId}`);
  }
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

// @desc   update  password
// @route   PUT/api/v1/users/updatepassword
// @access  private( person him self)
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ErrorResponse('please enter current and new  password', 400);
  }
  const currentUser = req.user;
  const user = await User.findById(currentUser._id);

  // check the pass
  const isMatch = user.compare(currentPassword);
  if (!isMatch) {
    throw new ErrorResponse('wrong password', 400);
  }
  user.password = newPassword;
  user.save();
  res.status(201).json({ success: true, msg: 'password updated ' });
});
// @desc   save  chances
// @route   PUT/api/v1/users/savechance
// @access  private( person him self)
exports.savedChances = asyncHandler(async (req, res, next) => {
  const chanceId = req.body.chanceId;
  const user = req.user;
  if (!chanceId) {
    throw new ErrorResponse(`please add chance id`, 400);
  }
  const chance = await Chance.findById(chanceId);
  if (!chance) {
    throw new ErrorResponse(`please add chance id`, 400);
  }
  user.savedChances.push(chance._id);
  user.save();
  res.status(200).json({ success: true, data: 'chance saved' });
});
// @desc   get saved chances
// @route   GET/api/v1/users/getchances
// @access  private( person him self)
exports.getSavedChances = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const chances = await User.find(user._id).select('savedChances');

  res.status(200).json({ success: true, data: chances });
});
