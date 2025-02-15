const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { generatingSessionToken } = require("../helpers/sessionHandling");
const employeeRepository = require("../database/repositories/employeeRepository");

const createEmployee = expressAsyncHandler(async (req, res) => {
  const { name, hire_date, address, phone, email, ssn } = req.body;

  try {
    const existingEmployee = await employeeRepository.findEmployeeByName(name);
    if (existingEmployee) {
      res.status(400);
      throw new Error("Employee already exists");
    }

    const newEmployee = await employeeRepository.createEmployee({
      name: name,
      hire_date: hire_date,
      address: address,
      phone: phone,
      email: email,
      ssn:ssn
    });

    if (newEmployee) {
      res.status(201).json({
        message: "Employee is successfully registered"
      });
    } else {
      res.status(400).json({
        message: "Unable to create employee.",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: `Error in creating employee`,
      error: err.message,
    });
  }
});

const employeeDetails = expressAsyncHandler(async (req, res) => {
  try {
    const employeeObject = await employeeRepository.findEmployeeById(req.params.id);
    if (employeeObject) {
      res.status(200).json({
        _id: employeeObject._id,
        name: employeeObject.name,
        fullname: employeeObject.fullname,
        email: employeeObject.email,
        isAdmin: employeeObject.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Unable to fetch the employee details");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching employee details",
      error: err.message,
    });
  }
});

const editEmployee = expressAsyncHandler(async (req, res) => {
  try {
    const employeeObject = await employeeRepository.findEmployeeById(req.params.id);
    if (employeeObject) {
      employeeObject.name = req.body.name 
      employeeObject.hire_date = req.body.hire_date 
      employeeObject.address = req.body.address
      employeeObject.phone = req.body.phone
      employeeObject.email = req.body.email
      employeeObject.isActive = req.body.is_active
      employeeObject.ssn = req.body.ssn

      const response = await employeeRepository.updateEmployee(employeeObject._id,   employeeObject
      );
      if (!response) throw new Error("Unable to update the employee details");

      res.status(200).json({
        data:response,
        message: "Employee details were successfully updated.",
      });
    } else {
      res.status(400);
      throw new Error("Unable to update the employee details");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating the employee details",
      error: err.message,
    });
  }
});

const deleteEmployeeHandler = expressAsyncHandler(async (req, res) => {
  try {
    const employeeObject = await employeeRepository.findEmployeeById(req.params.id);
    if (employeeObject) {
      employeeObject.isActive = false;
      const employeeSessionObject = await employeeRepository.findActiveEmployeeSession(
        employeeObject._id
      );
      if (employeeSessionObject) {
        await employeeRepository.deactivateEmployeeSession(employeeSessionObject);
      }
      await employeeRepository.updateEmployee(employeeObject._id, employeeObject);

      res.status(200).json({
        message: "Employee deleted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Unable to delete the employee");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error while deleting the employee",
      error: err.message,
    });
  }
});

const getEmployee = expressAsyncHandler(async (req, res) => {
  try {
    const employee = await employeeRepository.findEmployeeById();
    res.status(200).json({
      employee: employee,
      message: "Successfully fetched employee.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching employee details",
      error: err.message,
    });
  }
});

const getAllActiveEmployees = expressAsyncHandler(async (req, res) => {
  try {
    const employees = await employeeRepository.findActiveEmployees();
    res.status(200).json({
      employees: employees,
      message: "Successfully fetched all active Employees.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching employee details",
      error: err.message,
    });
  }
});

const getAllEmployees = expressAsyncHandler(async (req, res) => {
  try {
    const employees = await employeeRepository.getAllEmployees();
    res.status(200).json({
      employees: employees,
      message: "Successfully fetched all Employees.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching employee all employees",
      error: err.message,
    });
  }
});

module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee: deleteEmployeeHandler,
  editEmployee,
  getAllEmployees,
  getAllActiveEmployees,
  employeeDetails,
};
