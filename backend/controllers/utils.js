/*
  When the x-forwarded-header can be trusted, we check if it is HTTP.
  If it is, we redirect the user to their desired URL, instead prefixing it
  with HTTPS.
*/
const redirectUsingHTTPS = function (request, response, next) {
  // https://stackoverflow.com/a/23426060
  if (request.get('x-forwarded-proto') !== 'https') {
    response.redirect(`https://${request.header('host')}${request.url}`);
  } else {
    next();
  }
};

module.exports = {
  redirectUsingHTTPS,
};
