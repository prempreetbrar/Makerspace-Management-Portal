/**
 * Defines routes related to the Equipment resource and handles HTTP requests for equipment-related operations.
 */

const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const Equipment = require("../models/Equipment")(sequelize);

// Get all Equipment
router.get("/", async (req, res) => {
    try {
        const equipment = await Equipment.findAll();
        res.status(200).json(equipment);
    } 
    catch (error) {
        console.error("Error fetching equipment", error);
        res.status(500).json({ error: "An error occurred while fetching equipment" });
    }
});

module.exports = router;
