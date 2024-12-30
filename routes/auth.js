const express = require('express');
const { register, login , forgetPassword, resetPassword } = require('../controllers/auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword').post(resetPassword)

module.exports = router;
