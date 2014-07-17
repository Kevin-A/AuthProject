var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
var User = require('./models/user').User;

// Create a server with a host and port
var server = Hapi.createServer(Config.server.port);

// Register the plugin
server.pack.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'worldofwalmart', // cookie secret
        cookie: 'session', // Cookie name
        redirectTo: false, // Let's handle our own redirections
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });

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
});