// models
const sequelize = require('../config/database');
const Equipment = require('../models/Equipment')(sequelize);

// controllers
const errorsController = require('./errors');
const factoryController = require('./factory');

/*
  We can't really have a factory function for filtering, because filters are so unique depending
  on what model you're working with. Searching is also considered a type of "filter."
*/
const extractEquipmentFilters = errorsController.catchAsync(
  async (request, response, next) => {
    request.body.filter = {};

    // name
    if (request.query.name) {
      request.body.filter.name = {
        [Op.like]: `%${request.query.name}%`,
      };
    }

    // maintenance
    if (request.query.maintenance) {
      request.query.isUnderMaintenance = Boolean(
        request.query.isUnderMaintenance
      );
    }

    // premium
    if (request.query.isPremium) {
      request.query.isPremium = Boolean(request.query.isPremium);
    }

    // move to the next middleware (ie. continue processing the request)
    next();
  }
);

const getAllEquipment = factoryController.getAll(Equipment);

module.exports = {
  extractEquipmentFilters,
  getAllEquipment,
};
