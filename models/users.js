const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = bcrypt.genSaltSync(10);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  roles: {
    type: Array,
    required: false,
    default: ['user'],
  },
});

UserSchema.pre('save', function _(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model('User', UserSchema);
