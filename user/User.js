var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  phone: String,
  location: String,
  wallets: [{
    publicAddress: { type: String, required: true, unique: true },
    privateKey: { type: String, required: true },
    created_at: Date,
  }],
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');