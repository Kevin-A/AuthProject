var Mongoose = require('../database').Mongoose;
var passportLocalMongoose = require('passport-local-mongoose');

//create the schema
var userSchema = new Mongoose.Schema({
	email: 	   {	type: String,	required: true },
	password:  {	type: String,	required: true },
	creationDate: {	type: Date,		required: true, default: Date.now },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email', hashField: 'password', usernameLowerCase: true });

//create the model
var User = Mongoose.model('User', userSchema, 'Users');

exports.User = User;