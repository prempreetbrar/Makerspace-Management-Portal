/**
 * Defines routes related to the User resource and handles HTTP requests for user-related operations.
 */

const express = require('express');
const router = express.Router();

// models
const User = require('../models/User');

// controllers
const usersController = require('../controllers/users');

// routes
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.put(
    '/profile',
    usersController.isUserLoggedIn,
    usersController.updateUserProfile
);
router.get(
    '/profile',
    usersController.isUserLoggedIn,
    usersController.getUserProfile
);

// all routes from this point onwards are only available to logged in, basic users
router.use(
    usersController.isUserLoggedIn,
    usersController.isUserAuthorized(User.BASIC)
);

router.get('/checkout', usersController.checkout);
router.get('/checkout/:STRIPE_SECRET_KEY', usersController.setUserPremium);

module.exports = router;
