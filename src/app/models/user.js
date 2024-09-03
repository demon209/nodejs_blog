// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
  fullname: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
