const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const truckRouter = express.Router();

const {
    createTruck,
    editTruck,
    deleteTruck,
    getTruck,
    getAllTrucks
} = require("../services/truckService");

truckRouter.route("/").post(auth, isAdmin, createTruck);
truckRouter.route("/:id").put(auth, isAdmin, editTruck);
truckRouter.route("/:id").delete(auth, isAdmin, deleteTruck);
truckRouter.route("/:id").get(getTruck);
truckRouter.route("/").get(getAllTrucks);

module.exports =  truckRouter
