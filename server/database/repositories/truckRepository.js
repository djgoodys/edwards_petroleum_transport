const TruckModel = require("../../models/truckModel");

const createTruck = async (truckData) => {
  try {
    const newTruck = new TruckModel(truckData);
    const result = await newTruck.save();
    const trucks = await TruckModel.find({});
    return trucks;
  } catch (err) {
    throw new Error(`Error while creating truck: ${err.message}`);
  }
};

const editTruck = async (truckId, newData) => {
  try {
    const truckObject = await TruckModel.findOne({
      _id: truckId
    });

    if (!truckObject) {
      return null;
    }
    truckObject.area_served = newData.area_served
    truckObject.location = newData.location
    truckObject.assigned_to = newData.assigned_to
    truckObject.color = newData.color
    truckObject.capacity = parseFloat(newData.capacity)
    truckObject.milage = newData.milage
    truckObject.year = newData.year
    truckObject.lic_plate = newData.lic_plate

    const updatedTruck = await truckObject.save();
    const AllTrucks = await TruckModel.find({})
    return AllTrucks;
  } catch (err) {
    throw new Error(`Error while editing truck: ${err.message}`);
  }
};

const deleteTruck = async (truckId) => {
  try {

    const deletedTruck = await TruckModel.findByIdAndDelete(truckId)
    const allTrucks = await TruckModel.find({})
    return allTrucks;
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
