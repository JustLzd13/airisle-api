//[SECTION] Dependencies and Modules
const Ticket = require('../models/Ticket.js');

//[CONTROLLER] Create a new ticket (User)
module.exports.createTicket = async (req, res) => {
    try {
        const { userId, flightType, seatNumber, paymentId, bookingId } = req.body;

        // Validate required fields
        if (!userId || !flightType || !seatNumber || !paymentId || !bookingId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newTicket = new Ticket({
            userId,
            flightType,
            seatNumber,
            paymentId,
            bookingId
        });

        const savedTicket = await newTicket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: savedTicket });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//[CONTROLLER] Retrieve all tickets for a user (User)
module.exports.getUserTickets = async (req, res) => {
    try {
        const { userId } = req.query; // Using req.query to filter by userId

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userTickets = await Ticket.find({ userId });

        if (!userTickets.length) {
            return res.status(404).json({ message: "No tickets found for this user" });
        }

        res.status(200).json(userTickets);
    } catch (error) {
        console.error("Error fetching user tickets:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//[CONTROLLER] Retrieve a single ticket by ID for a user (User)
module.exports.getUserTicketById = async (req, res) => {
    try {
        const { userId, id } = req.params; // Using req.params instead of query for better structure

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const ticket = await Ticket.findOne({ _id: id, userId });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
