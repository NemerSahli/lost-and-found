const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordKey: String,
  about: String,
  country: String,
  city: String,
  zip: String,
  phone: String,
  registrationDate: Date,
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.jwtPrivateKey
  );
  return token;
};

// userSchema.pre('save', function(next) {
//   this.date = new Date();
//   next();
// });

module.exports = mongoose.model('User', UserSchema);
