const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    airlineName: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true
    },
    dateOfFlight: {
        type: String,
        required: true
    },
    seatCapacity: {
        type: Number,
        required: true,
        min: 1
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0
    },
    flightStatus: {
        type: String,
        enum: ['Scheduled', 'On Time', 'Delayed', 'Cancelled', 'Departed'],
        default: 'Scheduled'
    }
});

module.exports = mongoose.model('Flight', FlightSchema);
