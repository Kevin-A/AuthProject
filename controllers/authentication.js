var Joi = require('joi');
var User = require('../models/user').User;

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {
	validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
	handler: function (request, reply) {
		var Passport = request.server.plugins.travelogue.passport;
        Passport.authenticate('local', {
        	successRedirect: '/batmanshideout'
        })(request, reply);
    }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
	auth: 'passport',
	handler: function (request, reply) {
		request.session._logout();
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
                reply(err);
                return;
            }

            reply().redirect('/login');
        });
	}
};