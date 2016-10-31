'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var User = require("../models/User");

module.exports.authenticateUser = function(req,res) {
	var name = req.body.username;
	var pwd = req.body.password;

	// Validate credentials
	User.validateLogin(name, pwd, function(isValid) {
		var response = {
			message: "Invalid credentials",
			token: null
		};
		if(isValid !== false) { // User is authenticated
			response.message = "OK";

			// Validate LDAP binding
		}
		res.send(response);
	});
}