const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the truck
const truck_infoSchema = new Schema({
    lic_plate: {
        type: String,
        required: true,
        unique: true
    },
    truck_make: {
        type: String
    },
    year: {
        type: Number,
        required: true,
    },
    milage: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    area_served: {
        type: String,
    }, 
    capacity:{
        type: Number,
    },
    assigned_to: {
        type:String,
    },
     image: {
        type:String,
    }
});

// Create the model from the schema
const Truck = mongoose.model('Truck', truck_infoSchema);

module.exports = Truck;
