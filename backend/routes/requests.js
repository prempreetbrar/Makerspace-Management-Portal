/**
 * Defines routes related to the Request resource and handles HTTP requests for request-related operations.
 */

const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const RequestModel = require("../models/Request")(sequelize);

// Get all requests
router.get("/", async (_req, res) => {
    try {
        const requests = await RequestModel.findAll();
        res.status(200).json(requests);
    } 
    catch (error) {
        console.error("Error fetching requests", error);
        res.status(500).json({ error: "An error occurred while fetching requests" });
    }
});

module.exports = router;