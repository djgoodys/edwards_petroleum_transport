const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  hire_date: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  ssn: {
    type: String,
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
    type:Date
  }
});

employeeSchema.pre('save', function (next) {
  this.updatedTs = Date.now();
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
