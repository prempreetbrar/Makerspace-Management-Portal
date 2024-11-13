/**
 * Defines routes related to the Issue resource and handles HTTP requests for issue-related operations.
 */

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// models
const IssueModel = require('../models/Issue')(sequelize);

// controllers
const usersController = require('../controllers/users');
const issuesController = require('../controllers/issues');

// routes
router.use(usersController.isUserLoggedIn);
router
  .route('/')
  .post(
    usersController.isUserAuthorized('Basic', 'Premium'),
    issuesController.createIssue
  );

module.exports = router;
