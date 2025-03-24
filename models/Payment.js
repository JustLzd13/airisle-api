const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'userId is Required']
    },
    bookingId: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: [true, 'Total Amount is Required']
    },
    paymentMethod: {
        type: String,
        enum: ['Gcash', 'Debit Card', 'Paypal', 'Bank Transfer'],
        required: [true, 'Payment Method is Required']
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
