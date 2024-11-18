// models
const Equipment = require('../models/Equipment');

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

    // name. Specified in the URL when getting equipment.
    if (request.query.name) {
      request.body.filter.name = {
        [Op.like]: `%${request.query.name}%`,
      };
    }

    // maintenance. Specified in the URL when getting equipment.
    if (request.query.isUnderMaintenance) {
      request.body.filter.isUnderMaintenance =
        request.query.isUnderMaintenance === 'true';
    }

    // premium. Specified in the URL when getting equipment.
    if (request.query.isPremium) {
      request.body.filter.isPremium = request.query.isPremium === 'true';
    }

    // id. Specified in the body when updating an equipment (since PATCH has a request body as per the REST protocol)
    if (request.body.id) {
      request.body.filter.id = request.body.id;
    }

    // move to the next middleware (ie. continue processing the request)
    next();
  }
);

const getAllEquipment = factoryController.getAll(Equipment);
const updateEquipment = factoryController.updateOne(Equipment);

module.exports = {
  extractEquipmentFilters,
  getAllEquipment,
  updateEquipment,
};
