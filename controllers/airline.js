//[SECTION] Dependencies and Modules
const Airline = require('../models/Airline.js');

//[CONTROLLER] Create a new airline (Admin only)
module.exports.createAirline = async (req, res) => {
    try {
        const { airlineName, email, description, contactNumber, address, logo } = req.body;

        // Check for required fields
        if (!airlineName || !email || !description || !contactNumber || !address) {
            return res.status(400).json({ message: "All fields except logo are required." });
        }

        const newAirline = new Airline({
            airlineName,
            email,
            description,
            contactNumber,
            address,
            logo
        });

        const savedAirline = await newAirline.save();
        res.status(201).json({ message: "Airline created successfully", airline: savedAirline });
    } catch (error) {
        console.error("Error creating airline:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//[CONTROLLER] Search for an airline (Any user)
module.exports.searchAirline = async (req, res) => {
    try {
        const { name } = req.query;

        let query = {};
        if (name) {
            query.airlineName = { $regex: new RegExp(name, "i") }; // Case-insensitive search
        }

        const airlines = await Airline.find(query);
        res.status(200).json(airlines);
    } catch (error) {
        console.error("Error searching for airlines:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//[CONTROLLER] Retrieve all airlines (Admin only)
module.exports.getAllAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find();
        res.status(200).json(airlines);
    } catch (error) {
        console.error("Error retrieving airlines:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//[CONTROLLER] Update airline details (Admin only)
module.exports.updateAirline = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedAirline = await Airline.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAirline) {
            return res.status(404).json({ message: "Airline not found" });
        }

        res.status(200).json({ message: "Airline updated successfully", airline: updatedAirline });
    } catch (error) {
        console.error("Error updating airline:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//[CONTROLLER] Delete an airline (Admin only)
module.exports.deleteAirline = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAirline = await Airline.findByIdAndDelete(id);

        if (!deletedAirline) {
            return res.status(404).json({ message: "Airline not found" });
        }

        res.status(200).json({ message: "Airline deleted successfully" });
    } catch (error) {
        console.error("Error deleting airline:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
