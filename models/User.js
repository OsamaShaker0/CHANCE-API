const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomStr = require('randomstring');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name '],
    minlength: [4, 'name lenght must be more than 4 chars'],
  },

  email: {
    type: String,
    required: [true, 'please add an email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'please add valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'please provide password '],
    minlength: [6, 'password lenght must be more than 6 chars'],
  },
  industry: {
    type: String,
    required: [true, `please add your industry`],
  },
  role: {
    type: String,
    required: [true, `please add your role in your company`],
  },
  permission: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },

  companyName: {
    type: String,
  },
  location: {
    type: String,
  },
  photo: {
    type: String,
  },
  resetPassword: {
    type: String,
    required: true,
    default: 'No code',
  },
  savedChances:{
    type:Array,
  }
});

//=======================
// password crypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  // generate salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
UserSchema.methods.compare = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// create random string
UserSchema.methods.resetPass = function () {
  const random = randomStr.generate(7);
  this.resetPassword = random;
  this.save();
  return this.resetPassword;
};

module.exports = mongoose.model('User', UserSchema);
