require('dotenv').config();
var settings = require("../config/settings.js");
var jwt    = require('jsonwebtoken');
var loginModel = require("../models/Login");
var userModel = require("../models/User");
var librarianModel = require("../models/Librarian");

module.exports.authenticateLogin = function(req, res) {

	if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        // TODO validate LDAP first. Local validation occurs .then()
        loginModel.validateLdapBind(username, password).then(response => {

            if(response === true) {
                console.log("LDAP valid"); // dev
                userModel.validateLisdUser(username).then(response => {   // or use controller.authenticateLogin
                    console.log("Fulfilled have response");
                    if (response !== false) {

                        console.log("Local Auth valid"); // dev
                        // Check if user is a librarian
                        librarianModel.findByUserID(response.userID, function(librarianID) {

                            console.log("LIBID: " + librarianID);
                            response['librarianID'] = librarianID;

                            var token = loginModel.createToken(response);

                            // return the information including token as JSON
                            console.log("Sending response with token");
                            console.log(token);
                            res.json({
                              token: token,
                              sessionData: response
                            });
                        });

                    } else {

                        console.log("Local Auth Invalid"); // dev
                        res.status(403);
                        res.json({
                            token: null,  // Invalid credentials
                            sessionData: {}
                        });
                    }
                });
            }
            else {

                console.log("Auth Invalid"); // dev
                res.status(403);
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
