const express = require('express');
const { getUsers, getSingleUser,updateUser } = require('../controllers/user');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getSingleUser).put(updateUser)

module.exports = router;
