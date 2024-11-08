const sequelize = require('sequelize');

/*
  This function takes in another function and executes it, catching any
  errors it throws using "throw". This way, a try block is not
  needed in the asyncFunction, and we can have a single "catch" function
  that deals with all errors.

  Before:
  asyncFunc() {
    try {
      regular asyncFunc code
    } catch {
      asyncFunc error handling 
    }
  }

  After:
  asyncFunc() {
    regular asyncFunc code
  }
*/

function catchAsync(asyncFunc) {
  return function wrapper(request, response, next) {
    asyncFunc(request, response, next).catch(next);
  };
}

/*
  This is our error-handling middleware. Notice that other middleware
  in other files (like controller files) only take request and response (or
  request, response, next). 

  This middleware is special because it has 4 arguments (the error is the first one).
  This is how Express knows to "jump" to this middleware function in our middleware 
  "pile" or "stack" whenever it encounters an error.

  Allow the error to be sent back to the individual making the request, but
  also print it in the console (so that if you're working on a local development
  environment you can see it).
*/
function handleError(error, request, response, next) {
  const errorItem = error.errors.pop();

  // the following conditional just formats our error so it's easier to read when developing and in the frontend.
  // it would still work even if we didn't have this, but the stack trace would be very nasty.
  if (error instanceof sequelize.Sequelize.UniqueConstraintError) {
    error.message = `DUPLICATE FIELD. ${errorItem.message}: ${errorItem.value}. Please use another ${errorItem.path}.`;
    error.statusCode = 409;
  } else if (error instanceof sequelize.Sequelize.ValidationError) {
    let errorValue = '';
    switch (errorItem.path) {
      // We don't want to return the value in the error (passwords are sensitive), so just put a period.
      case 'Password':
      case 'PasswordConfirm':
        errorValue += '.';
        break;
      default:
        errorValue += `: ${errorItem.value}. Ensure you filled out the relevant fields correctly.`;
    }

    error.message = `VALIDATION ERROR. ${errorItem.message}${errorValue}`;
    error.statusCode = 422;
  } else if (error instanceof sequelize.Sequelize.ForeignKeyConstraintError) {
    error.message = `FOREIGN KEY CONSTRAINT ERROR. ${errorItem.message}: ${errorItem.value}. Please ensure that ${errorItem.path} is not empty and refers to an existing ${errorItem.path}.`;
    error.statusCode = 400;
  } else if (error instanceof jwt.TokenExpiredError) {
    error.message = 'Your token has expired. Please log in again!';
    error.statusCode = 401;
  } else if (error instanceof jwt.JsonWebTokenError) {
    error.message = 'Invalid token. Please log in again!';
    error.statusCode = 401;
  }

  // print the error in the console so you can see it in the backend console (you'll also be able to see it
  // in the chrome network tab as well as POSTMAN)
  console.error('\n', error, '\n');

  return response.status(error.statusCode || 500).json({
    message: error.message,
    stack: error.stack,
    status: error.status || 'error',
  });
}

module.exports = {
  catchAsync,
  handleError,
};
