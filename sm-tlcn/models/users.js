var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UsersSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: Boolean,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  identitycard: {
    type: Number,
    required: true,
  },
  roleId: {
    type: Number,
    required: true,
  }
});
var Users = mongoose.model('Users', UsersSchema);
module.exports = Users;