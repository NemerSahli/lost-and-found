var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  city: String
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.previousVisit = this.lastVisit;
  this.lastVisit = currentDate;
  next();
});

//now assign schema to model
var User = mongoose.model('users', userSchema);

module.exports = User;
