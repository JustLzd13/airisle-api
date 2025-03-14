//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const ticketController = require('../controllers/ticket.js');
const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Create a ticket (User)
router.post('/create', verify, ticketController.createTicket);

// Retrieve all tickets for a user (User)
router.get('/user', verify, ticketController.getUserTickets);

// Retrieve a single ticket by ID for a user (User)
router.get('/user/:userId/ticket/:id', verify, ticketController.getUserTicketById);

module.exports = router;
