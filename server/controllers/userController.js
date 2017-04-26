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

                res.json({
                	token: token,  // OK
                	sessionData: data
                });
            } else {
            		console.log("Auth Invalid");

            	res.json({
                    token: null,  // Invalid credentials
                    sessionData: {}
                });
            }
        });

    } else {
        res.sendStatus(400);
    }
};
