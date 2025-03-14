const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile Number is required'],
        match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid mobile number']
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of Birth is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);