const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'userId is Required']
    },
    flightId: {
        type: String,
        required: [true, 'userId is Required']
    },
    passengers:[
        {
            fullName:{
                type: String,
                required: [true, 'Fullname is Required']
            },
            passengerAddress:{
                type: String,
                required: [true, 'Passenger Address is Required']
            },
            passengerAge:{
                type: String,
                required: [true, 'Passenger Age is Required']
            },
            passengerEmail:{
                type: String,
                required: [true, 'Passenger Email is Required']
            },
            passengerCpNo:{
                type: String,
                required: [true, 'Passenger Cellphone Number is Required']
            },
            passengerFlightType:{
                type: String,
                required: [true, 'Passenger Flight Type is Required']
            },
            passengerFee:{
                type: Number,
                required: [true, 'Passenger Fee is Required']
            }

        }
    ],
    bookingDate: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Unpaid'],
        default: 'Pending'
    }
    ,
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Cancelled'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);