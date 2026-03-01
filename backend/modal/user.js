const { Schema, model } = require('mongoose');
 
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = model('User', userSchema);

module.exports = User;