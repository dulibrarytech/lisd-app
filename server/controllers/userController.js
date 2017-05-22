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

        userModel.findDUID(username).then(duid => {
            
            // TODO validate LDAP first. Local validation occurs .then()
            loginModel.validateLdapBind(duid, password).then(ldapAuth => {

                if(ldapAuth === true) {
                    console.log("Ldap true");
                    userModel.validateLisdUser(username).then(response => {   // or use controller.authenticateLogin

                        if (response !== false) {

                            // Check if user is a librarian
                            librarianModel.findByUserID(response.userID, function(librarianID) {

                                response['librarianID'] = librarianID; // TEMP
                                var token = loginModel.createToken(response);

                                // return the information including token as JSON
                                console.log(token);
                                res.json({
                                  token: token,
                                  sessionData: response
                                });
                            });

                        } else {
                            res.status(403);
                            res.json({
                                token: null,  // Invalid credentials
                                sessionData: {}
                            });
                        }
                    });
                }
                else {
                    console.log("Ldap false");
                    res.status(403);
                    res.json({
                        token: null,  // Invalid credentials
                        sessionData: {}
                    });
                }
                
            });
        });

    } else {
        res.sendStatus(400);
    }
};

module.exports.userAll = function(req, res) {
    userModel.getAllUsers().then(users => {

        if(users === false) {
            res.status(500);
        }
        else {
            res.status(200);
        }
        res.json({
            data: users,
            token: req.headers['x-access-token']
        });
    });
};
