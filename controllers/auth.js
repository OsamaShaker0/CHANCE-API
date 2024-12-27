const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// @desc      register user
// @route     POST api/v1/user/register
// @access    public
exports.register = asyncHandler(async (req, res, next) => {
  res.send(req.body);
});
