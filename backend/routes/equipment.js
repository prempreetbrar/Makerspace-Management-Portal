/**
 * Defines routes related to the Equipment resource and handles HTTP requests for equipment-related operations.
 */

const express = require('express');
const router = express.Router();

// models
const User = require('../models/User');

// controllers
const usersController = require('../controllers/users');
const equipmentController = require('../controllers/equipment');

// routes
router.use(usersController.isUserLoggedIn);
router
    .route('/')
    .get(
        equipmentController.extractEquipmentFilters,
        equipmentController.getAllEquipment
    )
    .patch(
        ///usersController.isUserAuthorized(User.ADMIN),
        equipmentController.extractEquipmentFilters,
        equipmentController.updateEquipment
    );

module.exports = router;
