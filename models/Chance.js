const mongoose = require('mongoose');
const ChanceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide chance name'],
  },
  description: {
    type: String,
    required: [true, 'please provide chance description'],
    maxlenght: [500, 'max lenght for chars is 500'],
  },

  industry: {
    type: String,
    required: [true, 'please provide work industry'],
  },
  role: {
    type: String,
    required: [true, 'please provide the role'],
  },
  howToApply: {
    type: String,
    required: [true, 'please provide more info about how to apply '],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  lastDateToApply: {
    type: String,
    required: [
      true,
      'you need to add last date to apply as String or write unknown ',
    ],
  },
  applyClose: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Chance', ChanceSchema);
