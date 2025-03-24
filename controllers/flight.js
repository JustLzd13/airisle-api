//[SECTION] Dependencies and Modules
const Flight = require('../models/Flight.js');
const { errorHandler } = require("../auth.js");

//[CONTROLLER] Create a new flight (Admin only)
module.exports.createFlight = async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Debugging log

        const {
            flightNumber,
            airlineName,
            from,
            to,
            departureTime,
            arrivalTime,
            dateOfFlight,
            seatCapacity,
            availableSeats,
            flightStatus
        } = req.body;

        // Ensure departureTime is properly formatted
        if (!departureTime) {
            return res.status(400).json({ message: "departureTime is required." });
        }

        // Validate required fields
        if (!flightNumber || !airlineName || !from || !to || !arrivalTime || 
            !dateOfFlight || seatCapacity == null || availableSeats == null) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newFlight = new Flight({
            flightNumber,
            airlineName,
            from,
            to,
            departureTime,  // Ensure correct format
            arrivalTime,
            dateOfFlight,
            seatCapacity,
            availableSeats,
            flightStatus
        });

        const savedFlight = await newFlight.save();
        res.status(201).json({ message: "Flight created successfully", flight: savedFlight });
    } catch (error) {
        console.error("Error creating flight:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//[CONTROLLER] Retrieve flight details by ID (User & Admin)
module.exports.getFlightDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findById(id);

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json(flight);
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Update flight details (Admin only)
module.exports.updateFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedFlight = await Flight.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json({ message: "Flight updated successfully", flight: updatedFlight });
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Delete a flight (Admin only)
module.exports.deleteFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find();

        if (flights.length === 0) {
            return res.status(404).json({ message: "No flights found" });
        }

        res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// [CONTROLLER] Search flights by date and location
module.exports.searchFlight = async (req, res) => {
    try {
        const { dateOfFlight, from, to } = req.body;

        if (!dateOfFlight || !from || !to) {
            return res.status(400).json({ message: "dateOfFlight, from, and to fields are required." });
        }

        const flights = await Flight.find({
            dateOfFlight: dateOfFlight,
            from: { $regex: new RegExp(from, "i") }, // Case-insensitive and partial match
            to: { $regex: new RegExp(to, "i") } // Case-insensitive and partial match
        });

        if (flights.length === 0) {
            return res.status(404).json({ message: "No flights found matching the criteria." });
        }

        res.status(200).json(flights);
    } catch (error) {
        console.error("Error searching flights:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

