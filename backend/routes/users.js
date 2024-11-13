/**
 * Defines routes related to the User resource and handles HTTP requests for user-related operations.
 */

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// models
const UserModel = require('../models/User')(sequelize); // use import instead of this syntax

// controllers
const usersController = require('../controllers/users');

// routes
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;
