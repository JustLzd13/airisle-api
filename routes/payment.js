//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const paymentController = require('../controllers/payment.js');
const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Create a payment (User)
router.post('/create', verify, paymentController.createPayment);

// Retrieve all payments for a user (User)
router.get('/user', verify, paymentController.getUserPayments);

// Retrieve a single payment by ID for a user (User)
router.get('/user/:userId/payment/:id', verify, paymentController.getUserPaymentById);


module.exports = router;
