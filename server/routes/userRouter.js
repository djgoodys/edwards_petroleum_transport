const express = require('express');
const app = express();
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const userService = require('../services/userService');
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const logRoute = require('./logRoute');
app.use(logRoute);

const {
    createUser,
    editUser,
    deleteUser,
    getUser,
    getAllUsers,
    login,
    logout
} = require("../services/userService");
userRouter.post('/login', login); 
userRouter.post('/logout', logout);
userRouter.route("/").post(auth, isAdmin, createUser);
userRouter.route("/:id").put(auth, isAdmin, editUser);
userRouter.route("/:id").delete(auth, isAdmin, deleteUser);
userRouter.route("/:id").get(getUser);
userRouter.route("/").get(getAllUsers);
module.exports = userRouter
