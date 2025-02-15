const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  isAdmin: {
    type: Boolean,
    required: true
  },
  isActive: {
    type:Boolean,
    default:true
  },
  createdTs: {
    type: Date,
    default: Date.now
  },
  updatedTs: {
    type:Date,
    required: true
  }
});

userSchema.pre('save', function (next) {
  this.updatedTs = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
