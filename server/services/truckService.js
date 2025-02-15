const truckRepository = require("..//database/repositories/truckRepository");
const expressAsyncHandler = require("express-async-handler");

const createTruck = expressAsyncHandler(async (req, res) => {
  try {
    const result = await truckRepository.createTruck(req.body);
    if (result) {
      res.status(200).json({
        data:result,
        message: "Successfully created new truck.",
      })
    } else {
      res.status(400);
      throw new Error(`Truck creation failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating truck",
      error: err.message,
    });
  }
});

const editTruck = expressAsyncHandler(async (req, res) => {
  try {
    const truckId = req.params.id;
    const result = await truckRepository.editTruck(truckId, req.body);

    if (result) {
      res.status(200).json({
        message: "Truck is successfully edited",
        data:result
      });
    } else {
      res.status(400);
      throw new Error(`Truck editing failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error editing truck details",
      error: err.message,
    });
  }
});

const deleteTruck = expressAsyncHandler(async (req, res) => {
  try {
    const truckId = req.params.id;
    const result = await truckRepository.deleteTruck(truckId);

    if (result) {
      res.status(200).json({
        data:result,
        message: "Truck is successfully deleted",
      });
    } else {
      res.status(400);
      throw new Error(`Truck deletion failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting truck",
      error: err.message,
    });
  }
});

const getTruck = expressAsyncHandler(async (req, res) => {
  try {
    const truckId = req.params.id;
    const result = await truckRepository.getTruck(truckId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Sucessfully fetched truck details.",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the truck based on the truck id: ${truckId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching truck details",
      error: err.message,
    });
  }
});

const getAllTrucks = expressAsyncHandler(async (req, res) => {
  try {
    const result = await truckRepository.getAllTrucks();
    res.status(200).json({
      data: result,
      message: "Successfully fetched all trucks.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching trucks",
      error: err.message,
    });
  }
});

module.exports = {
  createTruck,
  editTruck,
  deleteTruck,
  getTruck,
  getAllTrucks,
};
