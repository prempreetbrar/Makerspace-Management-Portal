/**
 * Defines routes related to the Equipment resource and handles HTTP requests for equipment-related operations.
 */

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// models
const EquipmentModel = require('../models/Equipment')(sequelize);

// controllers
const usersController = require('../controllers/users');
const equipmentController = require('../controllers/equipment');

// routes
//router.use(usersController.isUserLoggedIn);
router
  .route('/')
  .get(
    equipmentController.extractEquipmentFilters,
    equipmentController.getAllEquipment
  );

module.exports = router;
