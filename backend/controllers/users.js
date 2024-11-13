// external packages
const jwt = require('jsonwebtoken');

// models
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);

// controllers
const errorController = require('./errors');

function _getAuthenticatedToken(user) {
  const token = jwt.sign(
    {
      // sequelize assigns an id implicitly behind the scenes
      id: user.id,
    },
    // we encrypt and decrypt tokens using this secret. If it's leaked, then someone knows
    // how to make a "fake" token and log-in as this user. This is why it's secret.
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
}

function _getAuthenticatedCookie() {
  // we send the token back "explicitly" in the response body, but also as a cookie.
  // sending it as a cookie ensures the frontend sends it with
  // requests automatically. If it wasn't a cookie, the frontend would have to manually do
  // token: <insert_token_value> with every request, which is annoying for our frontend developers.
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // https://expressjs.com/en/advanced/best-practice-security.html#:~:text=%7D))-,Set%20cookie%20security%20options,-Set%20the%20following
    secure:
      process.env.NODE_ENV === 'production' &&
      (request.secure || request.get('x-forwarded-proto') === 'https'),
    httpOnly: true,
  };

  return cookieOptions;
}

const signup = errorController.catchAsync(async (request, response) => {
  /*
    We can't just pass in request.body into User.create because we don't want a user giving themselves
    a premium or admin role for example. For other models, we can just take the body as is.
  */
  const newUser = await User.create({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });
  // we don't need to send the password back (the token is all the user needs). Since it's sensitive, hide it.
  newUser.password = undefined;

  const token = _getAuthenticatedToken(newUser);
  const cookie = _getAuthenticatedCookie();
  response.cookie('jwt', token, cookie);

  response.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

const login = errorController.catchAsync(async (request, response) => {
  if (!request.body.email || !request.body.password) {
    throw new errorController.ErrorWithStatusCode(
      'Please provide both a username and password!',
      400
    );
  }

  /*
    In our user model, we excluded password from being included in a query. However,
    this is an exception where we need the user's password (to compare it for login).
    Therefore, we explicitly include it. Sequelize will follow our "rules" specified
    in a query OVER those defined in the model.
  */
  const user = await User.findByPk(request.body.email, {
    attributes: { include: ['password'] },
  });

  if (
    !user ||
    !(await user.isPasswordCorrect(request.body.password, user.password))
  ) {
    throw new errorController.ErrorWithStatusCode(
      'Incorrect username or password',
      401
    );
  }

  // we don't need to send the password back (the token is all the user needs). Since it's sensitive, hide it.
  user.password = undefined;
  const token = _getAuthenticatedToken(user);
  const cookie = _getAuthenticatedCookie();
  response.cookie('jwt', token, cookie);

  response.status(200).json({
    status: 'success',
    token,
    user,
  });
});

module.exports = {
  signup,
  login,
};
