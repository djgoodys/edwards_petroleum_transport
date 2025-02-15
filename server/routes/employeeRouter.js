const express = require('express');
const app = express();
const employeeRouter = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');
const employeeService = require('../services/employeeService');
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const logRoute = require('./logRoute');
app.use(logRoute);

const {
    createEmployee,
    editEmployee,
    deleteEmployee,
    getEmployee,
    getAllEmployees,
    getAllActiveEmployees
} = require("../services/employeeService");
employeeRouter.route("/").post(auth, isAdmin, createEmployee);
employeeRouter.route("/:id").put(auth, isAdmin, editEmployee);
employeeRouter.route("/:id").delete(auth, isAdmin, deleteEmployee);
employeeRouter.route("/:id").get(getEmployee);
employeeRouter.route("/").get(getAllEmployees);
employeeRouter.route("/active").get(getAllActiveEmployees);
module.exports = employeeRouter
