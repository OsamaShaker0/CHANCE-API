const express = require('express');
const {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfilePhoto,

  updatePassword,
} = require('../controllers/user');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/updatepassword').put(protect,updatePassword);
router
  .route('/:id')
  .get(getSingleUser)
  .put(protect, authorize('admin', 'user', 'publisher'), updateUser)
  .delete(protect, authorize('admin', 'user', 'publisher'), deleteUser);

router
  .route('/:id/uploadphoto')
  .put(protect, authorize('admin', 'user', 'publisher'), uploadProfilePhoto);

module.exports = router;
