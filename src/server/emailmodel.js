var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
  userEmail: String,
  password: String,
  activationKey: String,
  previousVisit: String,
  lastVisit: String
});

emailSchema.pre('save', function(next) {
  var currentDate = new Date();
  console.log(currentDate);
  this.previousVisit = this.lastVisit;
  this.lastVisit = String(currentDate);
  next();
});

//now assign schema to model
var Email = mongoose.model('emails', emailSchema);
module.exports = Email;
