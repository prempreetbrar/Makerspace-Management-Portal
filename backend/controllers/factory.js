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

const createOne = (Model) => {
    return errorsController.catchAsync(async (request, response) => {
        console.log(`request.body = ${JSON.stringify(request.body)}`);
        const instance = await Model.create(request.body);
        const instanceWithAssociations = await Model.findByPk(instance.id, {
            include: {
                all: true,
                required: false,
                nested: false,
            },
        });

        response.status(201).json({
            status: 'success',
            [Model.name.toLowerCase()]: instanceWithAssociations,
        });
    });
};

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
            [pluralize(Model.name).toLowerCase()]: instances,
        });
    });
};

const deleteOne = (Model) => {
    return errorsController.catchAsync(async (request, response) => {
        // sequelize doesn't like an undefined "where", so if there was no filter just default to an
        // empty object which doesn't filter by anything anyways
        request.body.filter = request.body.filter || {};

        const deletedCount = await Model.destroy({
            where: request.body.filter,
        });

        if (deletedCount === 0) {
            throw new errorsController.ErrorWithStatusCode(
                `No ${Model.name} found with filter ${JSON.stringify(request.body.filter)}`,
                404
            );
        }

        response.status(204).json({
            status: 'success',
        });
    });
};

const updateOne = (Model) => {
    return errorsController.catchAsync(async (request, response) => {
        // sequelize doesn't like an undefined "where", so if there was no filter just default to an
        // empty object which doesn't filter by anything anyways
        request.body.filter = request.body.filter || {};
        const instance = await Model.findByPk(request.body.filter.id);

        if (!instance) {
            throw new errorsController.ErrorWithStatusCode(
                `No ${Model.name} found with filter ${JSON.stringify(request.body.filter)}`,
                404
            );
        }

        // override what is currently in the instance with new stuff int eh request body
        Object.assign(instance, request.body);
        // in this case, we're assuming that the frontend didn't send anything sus. Update is only used by admin's in our
        // app, so this is a safe assumption.
        await instance.save({ validate: false, hooks: false });

        response.status(200).json({
            status: 'success',
            [Model.name.toLowerCase()]: instance,
        });
    });
};

module.exports = {
    createOne,
    getAll,
    deleteOne,
    updateOne,
};
