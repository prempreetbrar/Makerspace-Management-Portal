/**
 * Defines routes related to the User resource and handles HTTP requests for user-related operations.
 */

const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const User = require("../models/User")(sequelize);

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } 
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

module.exports = router;
