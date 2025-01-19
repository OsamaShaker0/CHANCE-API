const Chance = require('../models/Chance');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

//   @decs     get all chances
//   @route    GET/api/v1/chances
//   @access   public
exports.getChances = asyncHandler(async (req, res, next) => {
  const chance = await Chance.find({});
  res
    .status(200)
    .json({ success: true, numOfChances: chance.length, data: chance });
});
//   @decs     get single chance
//   @route    GET/api/v1/chances/:id
//   @access   public
exports.getChance = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const chance = await Chance.findById(id);
  if (!chance) {
    throw new ErrorResponse(`there are no chance with id of ${id}`, 400);
  }
  res.status(200).json({ success: true, data: chance });
});
//   @decs     create new chance
//   @route    POST/api/v1/chances
//   @access   private (only user which has token)
exports.addChance = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const chance = await Chance.create(req.body);
  res.status(201).json({ success: true, createdChance: chance });
});
//   @decs     update chance
//   @route    PUT/api/v1/chances/:id
//   @access   private (only user which has token and made the chance)
exports.updateChance = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  let chance = await Chance.findById(id);
  if (!chance) {
    throw new ErrorResponse(`there are no chance with id of ${id}`, 400);
  }

  if (req.user.permission !== 'admin' && chance.user.toString() !== userId) {
    throw new ErrorResponse(`You are not allowed to access this route`, 401);
  }
  if(req.body.user){
    throw new ErrorResponse(`Bad Request`, 401);
  }
  chance = await Chance.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, updatedChance: chance });
});

//   @decs     delete chance
//   @route    PUT/api/v1/chances/:id
//   @access   private (only user which has token and made the chance)
exports.deleteChance = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  let chance = await Chance.findById(id);
  if (!chance) {
    throw new ErrorResponse(`there are no chance with id of ${id}`, 400);
  }
  if (chance.user.toString() !== userId && req.user.permission !== 'admin') {
    throw new ErrorResponse(`You are not allowed to access this route`, 401);
  }
  chance = await Chance.findByIdAndDelete(id);
  res.status(200).json({ success: true, deletedChance: chance });
});
