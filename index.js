var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');

// Create a server with a host and port
var server = Hapi.createServer(1337);

/******************************************/
/********* Travelogue setup ***************/
/******************************************/

// Setup of the plugins to use
var plugins = {
    yar: {
        cookieOptions: {
            password: 'worldofwalmart', // cookie secret
            isSecure: false // required for non-https applications
        }
    },
    travelogue: Config.server
};

// Initialise plugins
server.pack.require(plugins, function (err) { 
    if (err) {
        throw err;
    }
});

// Set passport as the strategy to use
server.auth.strategy('passport', 'passport');

// Grab a reference to Passport and the Model
var Passport = server.plugins.travelogue.passport;
var User = require('./models/user').User;

// Follow normal Passport rules to add Strategies
Passport.use(User.createStrategy());
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

/******************************************/
/******************************************/
/******************************************/

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, next) {
	console.log(request.path, request.query);
	next();
});

server.route(Routes.endpoints);

// Start the server
server.start(function() {
	console.log("The server has started on port: " + server.info.port);
});