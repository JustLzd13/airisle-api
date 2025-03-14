//[SECTION] Dependencies and Modules
const Payment = require('../models/Payment.js');
const { errorHandler } = require("../auth.js");

const mongoose = require("mongoose");


//[CONTROLLER] Create a new payment (User)
module.exports.createPayment = async (req, res) => {
    try {
        const { userId, bookingId, totalAmount, paymentMethod, paymentStatus } = req.body;

        // Validate required fields
        if ( !userId || !bookingId || !totalAmount || !paymentMethod || !paymentStatus) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newPayment = new Payment({
            userId,
            bookingId,
            totalAmount,
            paymentMethod,
            paymentStatus
        });

        const savedPayment = await newPayment.save();
        res.status(201).json({ message: "Payment created successfully", payment: savedPayment });
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Retrieve all payments for a specific user (User)
module.exports.getUserPayments = async (req, res) => {
    try {
        const { userId } = req.query; // Using req.query for flexibility

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userPayments = await Payment.find({ userId });

        if (!userPayments.length) {
            return res.status(404).json({ message: "No payments found for this user" });
        }

        res.status(200).json(userPayments);
    } catch (error) {
        errorHandler(error, res);
    }
};


//[CONTROLLER] Retrieve a single payment by ID for a user (User)
module.exports.getUserPaymentById = async (req, res) => {
    try {
        const { userId, id } = req.params; // Extract params

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Trim the ID to remove accidental spaces or newlines
        const trimmedId = id.trim();

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid payment ID format" });
        }

        // Find the payment with the corrected ObjectId
        const payment = await Payment.findOne({ _id: trimmedId, userId });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
