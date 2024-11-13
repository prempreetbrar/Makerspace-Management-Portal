// models
const sequelize = require('../config/database');
const Issue = require('../models/Issue')(sequelize);

// controllers
const factoryController = require('./factory');

const createIssue = factoryController.createOne(Issue);

module.exports = {
  createIssue,
};
