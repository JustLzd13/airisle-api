const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    flightType: {
        type: String,
        required: true
    },
    dateIssued: {
        type: Date,
        default: Date.now
    },
    seatNumber: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    bookingId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
