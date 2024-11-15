/**
 * Defines routes related to the Booking resource and handles HTTP requests for booking-related operations.
 */

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// models
const User = require('../models/User');

// controllers
const usersController = require('../controllers/users');
const bookingsController = require('../controllers/bookings');

// routes
router.use(usersController.isUserLoggedIn);

router.route('/slots').get(bookingsController.getAvailableBookingSlots);
router.route('/days').get(bookingsController.getAvailableBookingDays);
router
  .route('/days/slots')
  .get(bookingsController.getAvailableBookingDaysSlots);

router
  .route('/')
  .post(
    usersController.isUserAuthorized(User.BASIC, User.PREMIUM),
    bookingsController.extractCreateBookingsFilters,
    bookingsController.createBooking
  )
  .get(
    bookingsController.extractGetANDDeleteANDUpdateBookingsFilters,
    bookingsController.getAllUsersBookings
  )
  .delete(
    usersController.isUserAuthorized(User.BASIC, User.PREMIUM),
    bookingsController.extractGetANDDeleteANDUpdateBookingsFilters,
    bookingsController.deleteBooking
  )
  .patch(
    usersController.isUserAuthorized(User.ADMIN),
    bookingsController.extractGetANDDeleteANDUpdateBookingsFilters,
    bookingsController.updateBooking
  );

module.exports = router;
