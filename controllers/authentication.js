var Joi = require('joi');
var User = require('../models/user');

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {
  handler: function (request, reply) {

    // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
    // Passport and inserted the request and reply variables).
    User.authenticate()(request.payload.email, request.payload.password, function (err, user, passwordError) {

      // There has been an error, do something with it. I just print it to console for demo purposes.
      if (err) {
        console.error(err);
        return reply.redirect('/login');
      }

      // Something went wrong with the login process, could be any of:
      // https://github.com/saintedlama/passport-local-mongoose#error-messages
      if (passwordError) {
        // For now, just show the error and login form
        console.log(passwordError);
        return reply.view('login', {
          errorMessage: passwordError.message,
        });
      }

      // If the authentication failed user will be false. If it's not false, we store the user
      // in our session and redirect the user to the hideout
      if (user) {
        request.auth.session.set(user);
        return reply.redirect('/batmanshideout');
      }

      return reply.redirect('/login');

    });
  }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
  auth: 'session',
  handler: function (request, reply) {
    request.auth.session.clear();
    reply().redirect('/');
  }
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function(request, reply) {

    // Create a new user, this is the place where you add firstName, lastName etc.
    // Just don't forget to add them to the validator above.
    var newUser = new User({
      email: request.payload.email
    });

    // The register function has been added by passport-local-mongoose and takes as first parameter
    // the user object, as second the password it has to hash and finally a callback with user info.
    User.register(newUser, request.payload.password, function(err, user) {

      // Return error if present
      if (err) {
        return reply(err);
      }

      console.log('registered');
      return reply.redirect('/login');
    });
  }
};
