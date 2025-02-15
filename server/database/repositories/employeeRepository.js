const EmployeeModel = require("../../models/employeeModel");

const findEmployeeByName = async (employeename) => {
  try {
    return await EmployeeModel.findOne({ employeename: employeename, isActive: true });
  } catch (err) {
    throw new Error(`Error while finding employee by employeename: ${err.message}`);
  }
};

const createEmployee = async (employeeData) => {
  try {
    return await EmployeeModel.create(employeeData);
  } catch (err) {
    throw new Error(`Error while creating employee: ${err.message}`);
  }
};

const findEmployeeById = async (id) => {
  try {
    return await EmployeeModel.findOne({ _id: id });
  } catch (err) {
    throw new Error(`Error while finding employee by ID: ${err.message}`);
  }
};

const updateEmployee = async (id, updateData) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, updateData, { new: true });
    if(updatedEmployee){
      return EmployeeModel.find({})
    }
  } catch (err) {
    throw new Error(`Error while updating employee: ${err.message}`);
  }
};

const deleteEmployee = async (id) => {
  try {
    return await EmployeeModel.findByIdAndUpdate(id, { isActive: false });
  } catch (err) {
    throw new Error(`Error while deleting employee: ${err.message}`);
  }
};

const getAllEmployees = async () => {
  try {
    return await EmployeeModel.find({});
  } catch (err) {
    throw new Error(`Error while finding active employees: ${err.message}`);
  }
};

const findActiveEmployees = async () => {
  try {
    return await EmployeeModel.find({ isActive: true });
  } catch (err) {
    throw new Error(`Error while finding active employees: ${err.message}`);
  }
};

const findActiveEmployeeSession = async (employeeId) => {
  try {
    const uSession = await EmployeeSessionModel.findOne({
      employeeId: employeeId,
      isActive: true
    });
    if(!uSession){
      console.log("NO SESSION")
    }else{
      console.log("uSESSION="+uSession.employeeId)
    }
    return uSession
  } catch (err) {
    throw new Error(`Error while finding active employee session: ${err.message}`);
  }
};

const createEmployeeSession = async (sessionData) => {
  try {
    return await EmployeeSessionModel.create(sessionData);
  } catch (err) {
    throw new Error(`Error while creating employee session: ${err.message}`);
  }
};

const deactivateEmployeeSession = async (employeeSessionObject) => {
  try {
    employeeSessionObject.isActive = false;
    return await employeeSessionObject.save();
  } catch (err) {
    throw new Error(`Error while deactivating employee session: ${err.message}`);
  }
};


module.exports = {
  findEmployeeByName,
  createEmployee,
  findEmployeeById,
  updateEmployee,
  deleteEmployee,
  findActiveEmployees,
  getAllEmployees
};
