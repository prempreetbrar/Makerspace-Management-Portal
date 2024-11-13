// external packages
const pluralize = require('pluralize');

// controllers
const errorsController = require('./errors');

/*
  PURPOSE OF FILE:
  
  The code for doing certain things on a model is virtually the same across models. So,
  instead of duplicating this across every model, we'll just have a single factory function
  that performs the action.

  This reduces the amount of code we need to write in each controller class.
*/

const getAll = (Model) => {
  return errorsController.catchAsync(async (request, response) => {
    // sequelize doesn't like an undefined "where", so if there was no filter just default to an
    // empty object which doesn't filter by anything anyways
    request.body.filter = request.body.filter || {};

    const instances = await Model.findAll({
      where: request.body.filter,
      /*
        We want:
        - ALL associated instances from all other tables (JOIN on all of them)
        - Associations are NOT REQUIRED (left outer join) -> even if this instance has no associated instance from another table, still include it in the output
        - NO NESTED associations (we don't want Equipment -> Booking -> User. We only want Equipment -> Booking). Otherwise we end up in a circular 
          loop that never ends because two instances are fetching each other back and forth.
      */
      include: {
        all: true,
        required: false,
        nested: false,
      },
    });

    response.status(200).json({
      status: 'success',
      count: instances.length,
      [pluralize(Model.modelName || Model.name).toLowerCase()]: instances,
    });
  });
};

module.exports = {
  getAll,
};
