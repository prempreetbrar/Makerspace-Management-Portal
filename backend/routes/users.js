/**
 * Defines routes related to the User resource and handles HTTP requests for user-related operations.
 */

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// models
const UserModel = require('../models/User')(sequelize); // use import instead of this syntax

// controllers
const userController = require('../controllers/users');

// Get all users
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
