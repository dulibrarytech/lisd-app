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
                    console.log("LDAP succeeds");
                    userModel.validateLisdUser(username).then(response => {   // or use controller.authenticateLogin

                        if (response !== false) {

                            // Check if user is a librarian
                            librarianModel.findByUserID(response.userID, function(librarianID) {

                                response['librarianID'] = librarianID; // TEMP
                                var token = loginModel.createToken(response);

                                res.json({
                                  token: token,
                                  sessionData: response
                                });
                            });

                        } else {
                            res.status(200);
                            res.json({
                                token: null,  // Invalid local credentials. Return duid
                                sessionData: {
                                    duid: duid
                                }
                            });
                        }
                    });
                }
                else {
                    console.log("LDAP fail");
                    res.status(200);
                    res.json({
                        token: null,  // Invalid ldap credentials 
                        sessionData: {
                            duid: null
                        }
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

module.exports.userAddDUID = function(req, res) {
    userModel.insertDuid(req.body.DUID, req.body.lastName).then(response => {

        if(response === false) {
            res.sendStatus(500);
        }
        else {

            userModel.validateLisdUser(req.body.DUID).then(response => {   // or use controller.authenticateLogin

                if (response !== false) {

                    // Check if user is a librarian
                    librarianModel.findByUserID(response.userID, function(librarianID) {

                        response['librarianID'] = librarianID; // TEMP
                        var token = loginModel.createToken(response);

                        res.json({
                          token: token,
                          sessionData: response
                        });
                    });

                } else {
                    
                    // res.json({
                    //     token: null,  // Invalid local credentials. Return duid
                    //     sessionData: {
                    //         duid: duid
                    //     }
                    // });
                    console.log("Error: No local auth after successful DUID insert!");
                    res.status(200);
                    res.json({
                        sessionData: null,
                        token: null
                    });
                }
            });            
        }
    });
};


