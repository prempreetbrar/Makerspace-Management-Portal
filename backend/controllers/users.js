// external packages
const jwt = require('jsonwebtoken');

// models
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);

// controllers
const errorController = require('./errors');

const signup = errorController.catchAsync(async (request, response) => {
  const newUser = await User.create({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });

  const token = jwt.sign(
    {
      // sequelize assigns an id implicitly behind the scenes
      id: newUser.id,
    },
    // we encrypt and decrypt tokens using this secret. If it's leaked, then someone knows
    // how to make a "fake" token and log-in as this user. This is why it's secret.
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

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
  response.cookie('jwt', token, cookieOptions);

  // we don't need to send the password back (the token is all the user needs). Since it's sensitive, hide it.
  newUser.password = undefined;

  response.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

module.exports = {
  signup,
};
