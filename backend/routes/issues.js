/**
 * Defines routes related to the Issue resource and handles HTTP requests for issue-related operations.
 */

const express = require('express');
const router = express.Router();

// models
const User = require('../models/User');

// controllers
const usersController = require('../controllers/users');
const issuesController = require('../controllers/issues');

// routes
router.use(usersController.isUserLoggedIn);
router
  .route('/')
  .post(
    usersController.isUserAuthorized(User.BASIC, User.PREMIUM),
    issuesController.createIssue
  )
  .get(
    usersController.isUserAuthorized(User.ADMIN),
    issuesController.extractIssuesFilters,
    issuesController.getAllIssues
  )
  .patch(
    usersController.isUserAuthorized(User.ADMIN),
    issuesController.extractIssuesFilters,
    issuesController.updateIssue
  );

module.exports = router;
