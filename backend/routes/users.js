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

// all routes from this point onwards are only available to logged in, basic users
router.use(
  usersController.isUserLoggedIn,
  usersController.isUserAuthorized('Basic')
);

router.get('/checkout', usersController.checkout);
router.get('/checkout/:STRIPE_SECRET_KEY', usersController.setUserPremium);

module.exports = router;
