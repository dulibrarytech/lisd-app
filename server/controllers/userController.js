'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var User = require("../models/User");

module.exports.authenticateUser = function(req,res) {
	var name = req.body.username;
	var pwd = req.body.password;

	// Validate credentials
	// User.validateLogin(name, pwd, function(isValid) {

	// 	if(isValid !== false) { // User is authenticated
			
	// 		// Validate LDAP binding
	// 		authenticateLDAP(name, pwd, function(isLDAPValid) {
	// 			var response = {
	// 				message: "Invalid credentialsy",
	// 				token: null
	// 			};
	// 			response.send(response);
	// 		});
	// 	}
	// });

	var pmtest = User.validateLogin(name, pwd).then(function(res) {
			console.log("Controller receives:");
			console.log(pmtest)
		res.send(pmtest);
	});
}

var authenticateLDAP = function(username, password, callback) {
	callback(true);
};