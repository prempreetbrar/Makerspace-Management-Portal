// models
const Issue = require('../models/Issue');

// controllers
const factoryController = require('./factory');
const errorsController = require('./errors');

const extractIssuesFilters = errorsController.catchAsync(
  async (request, response, next) => {
    request.body.filter = {};

    // specified in the query when admin is fetching all issues
    if (request.query.isResolved !== undefined) {
      request.body.filter.isResolved = request.query.isResolved === 'true';
    }

    // Specified in the body when updating (since PATCH has a request body as per the REST protocol)
    if (request.body.id) {
      request.body.filter.id = request.body.id;
    }

    // move to the next middleware (ie. continue processing the request)
    next();
  }
);

const createIssue = factoryController.createOne(Issue);
const getAllIssues = factoryController.getAll(Issue);
const updateIssue = factoryController.updateOne(Issue);

module.exports = {
  extractIssuesFilters,
  createIssue,
  getAllIssues,
  updateIssue,
};
