'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var authModule = require("../config/auth.js");
var jwt = require("jwt-simple"); 
var cfg = require("../config/config.js"); 
var userModel = require("../models/User");

module.exports.authenticateLogin = function(req, res) {

	// user:: validateLogin
	// user:: validateLdap
	if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        
        userModel.validateLogin(username, password).then(response => {   // or use controller.authenticateLogin

            if (response === true) {
            	console.log("Local auth valid");
                // get user data to return to client
                // userModel.getUserData(response.userID).then(data => {

                // });

                // .then:
                var data = {
                	id: 1,
                	firstname: "Jeff",
                	lastname: "Rynhart",
                	role: 1
                }
                var token = userModel.createToken(data);
	                console.log("Token:");
	                console.log(token);

                res.json({
                	sessionData: data,
                    token: token  // OK
                });
            } else {
            		console.log("Auth Invalid");

            	res.json({
                    token: null  // Invalid credentials
                });
            }
        });

    } else {
        res.sendStatus(400);
    }
};

// module.exports.authenticateUser = function(req,res) {
// 	var name = req.body.username;
// 	var pwd = req.body.password;

// 	// Validate credentials
// 	// User.validateLogin(name, pwd, function(isValid) {

// 	// 	if(isValid !== false) { // User is authenticated
			
// 	// 		// Validate LDAP binding
// 	// 		authenticateLDAP(name, pwd, function(isLDAPValid) {
// 	// 			var response = {
// 	// 				message: "Invalid credentialsy",
// 	// 				token: null
// 	// 			};
// 	// 			response.send(response);
// 	// 		});
// 	// 	}
// 	// });

// 	var pmtest = User.validateLogin(name, pwd).then(function(res) {
// 			console.log("Controller receives:");
// 			console.log(pmtest)
// 		res.send(pmtest);
// 	});
// };

