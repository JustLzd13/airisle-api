const mongoose = require('mongoose');

const AirlineSchema = new mongoose.Schema({
    airlineName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Airline Description is Required']
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    logo: {
        type: String, 
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Airline', AirlineSchema);
