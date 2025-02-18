const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truck_infoSchema = new Schema({
    lic_plate: {
        type: String,
        required: true,
        unique: true
    },
    make: {
        type: String
    },
    year: {
        type: String,
        required: true,
    },
    milage: {
        type: Number,
        required: true,
        default: 0,
    },
    location: {
        type: String,
    },
    area_served: {
        type: String,
    }, 
    capacity:{
        type: Number,
        default:0,
    },
    assigned_to: {
        type:String,
    },
    unit: {
        type:String
    },
    unladen_weight: {
        type:String
    },
    gross_weight: {
        type:String
    },
    axles: {
        type:String
    },
    make: {
        type:String
    },
    type: {
        type:String
    },
    fuel: {
        type:String
    },
    vin: {
        type:String
    },
    reg_expires: {
        type:Date
    },
     image: {
        type:String,
    }
});

// Create the model from the schema
const Truck = mongoose.model('Truck', truck_infoSchema);

module.exports = Truck;
