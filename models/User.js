const mongoose = require('mongoose');
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
      'please add avalid email',
    ],
  },
  industry: {
    type: String,
    required: [true, `please add your industry`],
  },
  role: {
    type: String,
    required: [true, `please add your role in your company`],
  },
  role: {
    type: String,
    required: [true, `please add your role in your company`],
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
});

module.exports = mongoose.model('User', UserSchema);
