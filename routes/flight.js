//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const flightController = require('../controllers/flight.js');
const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Create a flight (Admin only)
router.post('/create', verify, verifyAdmin, flightController.createFlight);

// Retrieve all flights (User & Admin)
router.get('/all', verify, flightController.getAllFlights);  // ✅ New Route

// Retrieve flight details (User & Admin)
router.get('/details/:id', verify, flightController.getFlightDetails);

// Update flight details (Admin only)
router.put('/update/:id', verify, verifyAdmin, flightController.updateFlight);

// Delete a flight (Admin only)
router.delete('/delete/:id', verify, verifyAdmin, flightController.deleteFlight);

module.exports = router;
