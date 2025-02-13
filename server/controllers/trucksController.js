const Truck = require('../models/truckModel');
const expressAsyncHandler = require("express-async-handler");

const getTrucks = expressAsyncHandler(async (req, res) => {
  try {
    const username = req.query.username;
    const notes = req.query.notes;
    const filter_type = req.query.filter_types;
    const image = req.query.image;
    const assigned_to = req.query.assigned_to;
    const newtasks = req.query.newtasks;
    let trucks;
    const allTrucks = await Truck.find({});
    res.json(allTrucks);
  } catch (error) {
    console.error('Error fetching trucks:', error);
    res.status(500).send('Server Error');
  }
})

const assigned_too = expressAsyncHandler(async (req, res) => {
  try {
    const truck = await Truck.findById(req.body._id);
    if (!truck) {
      return res.status(404).json({ msg: 'Truck not found' });
    }
    res.json(truck);
  } catch (error) {
    console.error('Error fetching truck:', error);
    res.status(500).send('Server Error');
  }
})


const search = expressAsyncHandler(async (req, res) => {
  const searchwords = req.query.searchwords;
  const regex = new RegExp(searchwords, 'i');

  const filtered_trucks = await Truck.find({
    $or: [
      { id: { $regex: regex } },
      { unit_name: { $regex: regex } },
      { location: { $regex: regex } },
      { area_served: { $regex: regex } },
      { filter_size: { $regex: regex } },
      { filters_due: { $regex: regex } },
      { belts: { $regex: regex } },
      { notes: { $regex: regex } },
      { storage: { $regex: regex } },
      { filter_rotation: { $regex: regex } },
      { filters_last_changed: { $regex: regex } },
      { assigned_to: { $regex: regex } },
      { image: { $regex: regex } }
    ]
  });

  if (filtered_trucks) {
    res.json(filtered_trucks);
  } else {
    res.send(`No units found with searchwords${searchwords}`);
  }
})

const editunit = expressAsyncHandler(async (req, res) => {
  trucks = await Truck.findByIdAndUpdate(
    unitId,
    {
      assigned_to: assigned_to,
      unit_name: unit_name,
      rotation: rotation,
      location: location,
      area_served: area_served,
      filter_size: filter_size,
      filters_due: filters_due,
      belts: belts,
      notes: notes,
      filter_type: filter_type,
      image: image
    }
  );
  if (trucks) {
    trucks = await Truck.find({});
    res.json(trucks);
  }
  else {
    res.send("404 unit with id:" + unitId + " was not found")
  }
})

const deleteunit = expressAsyncHandler(async (req, res) => {
  trucks = await Truck.findByIdAndDelete(unitId)
  if (!trucks) {
    res.send(unitId + " was not found")
  } else {
    trucks = await Truck.find({});
    res.json(trucks);
  }
})

const createTruck = expressAsyncHandler(async (req, res) => {
  try {
    const newTruck = new Truck(req.body);
    const savedTruck = await newTruck.save();
    res.status(201).json(savedTruck);
  } catch (error) {
    console.error('Error creating trucks:', error);
    res.status(500).json({ message: error.message });
  }
})



module.exports = {
  getTrucks
};
