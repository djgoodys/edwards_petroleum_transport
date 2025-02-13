const TruckModel = require("../../models/truckModel");

const createTruck = async (name, description, image) => {
  try {
    const newTruck = await TruckModel.create({
      name: name,
      description: description,
      image: image
    });
    return newTruck;
  } catch (err) {
    throw new Error(`Error while creating truck: ${err.message}`);
  }
};

const editTruck = async (truckId, newData) => {
  try {
    const truckObject = await TruckModel.findOne({
      _id: truckId,
      isActive: true,
    });

    if (!truckObject) {
      return null;
    }

    truckObject.name = newData.name;
    truckObject.description = newData.description;
    truckObject.image = newData.image;

    const updatedTruck = await truckObject.save();
    return updatedTruck;
  } catch (err) {
    throw new Error(`Error while editing truck: ${err.message}`);
  }
};

const deleteTruck = async (truckId) => {
  try {
    const truckObject = await TruckModel.findById(truckId);

    if (!truckObject) {
      return null;
    }

    truckObject.isActive = false;
    const updatedTruck = await truckObject.save();
    return updatedTruck;
  } catch (err) {
    throw new Error(`Error while deleting truck: ${err.message}`);
  }
};

const getTruck = async (truckId) => {
  try {
    const truckObject = await TruckModel.findOne({
      _id: truckId,
      isActive: true,
    });
    
    return truckObject;
  } catch (err) {
    throw new Error(`Error while fetching truck: ${err.message}`);
  }
};

const getAllTrucks = async () => {
  try {
    const trucks = await TruckModel.find({});
    return trucks;
  } catch (err) {
    throw new Error(`Error while fetching trucks: ${err.message}`);
  }
};

const getTruckIdByName = async (truckName) => {
  try {
    const truckObject = await TruckModel.findOne({
      name: truckName,
      isActive: true,
    });
    return truckObject._id;
  } catch (err) {
    throw new Error(`Error while fetching truck: ${err.message}`);
  }
}
module.exports = {
  createTruck,
  editTruck,
  deleteTruck,
  getTruck,
  getAllTrucks,
  getTruckIdByName,
};
