const express = require('express');
const {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfilePhoto,

  updatePassword,
  savedChances,
  getSavedChances,
} = require('../controllers/user');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/savedchances').get(protect, getSavedChances);
router.route('/updatepassword').put(protect, updatePassword);

router.route('/savechance').put(protect, savedChances);
router
  .route('/:id')
  .get(getSingleUser)
  .put(protect, authorize('admin', 'user', 'publisher'), updateUser)
  .delete(protect, authorize('admin', 'user', 'publisher'), deleteUser);


router
  .route('/:id/uploadphoto')
  .put(protect, authorize('admin', 'user', 'publisher'), uploadProfilePhoto);

module.exports = router;
