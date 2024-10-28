/**
 * Defines routes related to the Booking resource and handles HTTP requests for booking-related operations.
 */

const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const BookingModel = require("../models/Booking")(sequelize);

// Get all bookings
router.get("/", async (_req, res) => {
    try {
        const bookings = await BookingModel.findAll();
        res.status(200).json(bookings);
    } 
    catch (error) {
        console.error("Error fetching bookings", error);
        res.status(500).json({ error: "An error occurred while fetching bookings" });
    }
});

module.exports = router;