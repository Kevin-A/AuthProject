
/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/batmanshideout');
		}

		var data =
		'<h1> Hi there! </h1>' +
		'<p> Would you like to <a href="login">login</a> or <a href="register">register</a>? </p>';

    	return reply(data);
	}
};

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/batmanshideout');
		}

		var form =
		'<h1> Login </h1>' +
		'<form method="post" action="login">' +
		'	<p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
		'	<p><input type="password" name="password" value="" placeholder="Password"></p>' +
		'	<p><input type="submit"   value="Login"></p>' +
		'</form>';

   		return reply(form);
	}
};

/**
 * Handles a call to /register and shows a registration form
 */
exports.register = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {
		
		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/batmanshideout');
		}

		var form =
		'<h1> Register </h1>' +
		'<form method="post" action="register">' +
		'	<p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
		'	<p><input type="password" name="password" value="" placeholder="Password"></p>' +
		'	<p><input type="submit"   value="Register"></p>' +
		'</form>';

    	return reply(form);
	}
};

/**
 * Handles a call to /batmanshideout and shows super secret stuff
 */
exports.secret = {
	auth: 'session',
	handler: function (request, reply) {
		var data =
		'<h1> Batman\'s super secret hideout! </h1>' +
		'<p> Welcome to this totally secret hideout, ' + request.auth.credentials.email + '. Would you like to <a href="logout">leave</a>? </p>';

    	return reply(data);
	}
};