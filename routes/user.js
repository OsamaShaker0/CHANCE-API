const express = require('express');
const {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfilePhoto,
} = require('../controllers/user');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getUsers);
router
  .route('/:id')
  .get(getSingleUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.route('/uploadphoto/:id').put( protect,uploadProfilePhoto);

module.exports = router;
