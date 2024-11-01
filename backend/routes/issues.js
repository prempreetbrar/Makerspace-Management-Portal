/**
 * Defines routes related to the Issue resource and handles HTTP requests for issue-related operations.
 */

const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const IssueModel = require("../models/Issue")(sequelize);

// Get all issues
router.get("/", async (_req, res) => {
    try {
        const issues = await IssueModel.findAll();
        res.status(200).json(issues);
    } 
    catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ error: "An error occurred while fetching issues" });
    }
});


module.exports = router;
