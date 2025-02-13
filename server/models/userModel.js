const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the user
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: String,
    required: true
  },
  isActive: {
    type:Boolean,
    default:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
