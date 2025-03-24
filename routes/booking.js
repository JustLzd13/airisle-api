//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const bookingController = require('../controllers/booking.js');
const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Create a booking (User)
router.post('/create', verify, bookingController.createBooking);

// Process a payment for a booking (User) ✅ NEW
router.post("/process-payment", verify, bookingController.processPayment);

// Get all bookings (Admin only)
router.get('/all', verify, verifyAdmin, bookingController.getAllBookings);

// Get all bookings for a specific user (User)
router.get('/user', verify, bookingController.getUserBookings);

// Retrieve a single booking by ID for a user
router.get('/user/:userId/booking/:id', verify, bookingController.getUserBookingById);

module.exports = router;
