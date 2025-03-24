//[SECTION] Dependencies and Modules
const Booking = require('../models/Booking.js');
const { errorHandler } = require("../auth.js");
const mongoose = require("mongoose");

//[CONTROLLER] Create a new booking (User)
module.exports.createBooking = async (req, res) => {
    try {
        const { userId, flightId, passengers, bookingDate, totalPrice } = req.body;

        // Check required fields
        if (!userId || !flightId || !passengers || passengers.length === 0 || !bookingDate || !totalPrice) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new Booking({
            userId,
            flightId,
            passengers,
            bookingDate,
            totalPrice
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Retrieve all bookings (Admin only)
module.exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Retrieve all bookings for a specific user (User)
module.exports.getUserBookings = async (req, res) => {
    try {
        const { userId } = req.query; // Using req.query for flexibility

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userBookings = await Booking.find({ userId });

        if (!userBookings.length) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.status(200).json(userBookings);
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Retrieve a single booking by ID for a user (User)
module.exports.getUserBookingById = async (req, res) => {
    try {
        const { userId, id } = req.params; // Get params

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Trim the ID to remove accidental spaces or newlines
        const trimmedId = id.trim();

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        // Find the booking with the corrected ObjectId
        const booking = await Booking.findOne({ _id: trimmedId, userId });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.processPayment = async (req, res) => {
  try {
    const { bookingId, flightId, paymentMethod, amount } = req.body;
    const userId = req.user.id; // Extract user ID from token

    // Validate required fields
    if (!bookingId || !flightId || !paymentMethod || !amount) {
      return res.status(400).json({ message: "Booking ID, Flight ID, Payment Method, and Amount are required." });
    }

    // Find the booking
    const booking = await Booking.findOne({ _id: bookingId, flightId, userId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or does not belong to the user." });
    }

    // Check if booking is already paid
    if (booking.bookingStatus === "Confirmed") {
      return res.status(400).json({ message: "This booking is already confirmed and paid." });
    }

    // Ensure amount matches totalPrice
    if (amount !== booking.totalPrice) {
      return res.status(400).json({ message: "Payment amount does not match the booking total price." });
    }

    // Mock payment processing (Here you can integrate a real payment gateway like Stripe, PayPal, etc.)
    console.log(`Processing payment of $${amount} via ${paymentMethod} for booking ${bookingId}`);

    // Update booking status to "Confirmed"
    booking.bookingStatus = "Confirmed";
    booking.paymentStatus = "Paid"; // Assuming a paymentStatus field exists
    await booking.save();

    res.status(200).json({ message: "Payment successful. Booking confirmed.", booking });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
