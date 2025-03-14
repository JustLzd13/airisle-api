//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const airlineController = require('../controllers/airline.js');
const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Search for an airline (Any user)
router.get('/search', airlineController.searchAirline);

// Create a new airline (Admin only)
router.post('/create', verify, verifyAdmin, airlineController.createAirline);

// Update airline details (Admin only)
router.put('/update/:id', verify, verifyAdmin, airlineController.updateAirline);

// Retrieve all airlines (Admin only)
router.get('/all/:id', verify, verifyAdmin, airlineController.getAllAirlines);

// Delete an airline (Admin only)
router.delete('/delete/:id', verify, verifyAdmin, airlineController.deleteAirline);

module.exports = router;
