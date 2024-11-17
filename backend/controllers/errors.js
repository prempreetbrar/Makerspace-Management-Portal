const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

/*
  We want to be able to add a status code to our errors. Without this class, we would have to manually do
  that every time.

  Before:
    const error = new Error(message);
    error.statusCode = 4xx;
    throw error;

  After:
    throw new ErrorWithStatusCode(message, 4xx);
*/
class ErrorWithStatusCode extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

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
  // the following conditional just formats our error so it's easier to read when developing and in the frontend.
  // it would still work even if we didn't have this, but the stack trace would be very nasty.
  if (error instanceof sequelize.Sequelize.UniqueConstraintError) {
    const errorItem = error.errors.pop();
    error.message = `DUPLICATE FIELD. ${errorItem.message}: ${errorItem.value}. Please use another ${errorItem.path}.`;
    error.statusCode = 409;
  } else if (error instanceof sequelize.Sequelize.ValidationError) {
    const errorItem = error.errors[0];
    let errorValue = '';

    switch (errorItem.path) {
      // We don't want to return the value in the error (passwords are sensitive), so just put a period.
      case 'password':
      case 'confirmPassword':
        errorValue += '.';
        break;
      default:
        errorValue += `: ${errorItem.value}. Ensure you filled out the relevant fields correctly.`;
    }

    error.message = `VALIDATION ERROR. ${errorItem.message}${errorValue}`;
    error.statusCode = 422;
  } else if (error instanceof sequelize.Sequelize.ForeignKeyConstraintError) {
    const errorItem = error.errors[0];
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
  });
}

module.exports = {
  ErrorWithStatusCode,
  catchAsync,
  handleError,
};
