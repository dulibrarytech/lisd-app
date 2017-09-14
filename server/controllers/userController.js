require('dotenv').config();
var settings = require("../config/settings.js");
var jwt    = require('jsonwebtoken');
var loginModel = require("../models/Login");
var userModel = require("../models/User");
var librarianModel = require("../models/Librarian");

module.exports.authenticateLogin = function(req, res) {

    if(settings.runtime_env == "development") {
        var devSession = {
            userID: "1",
            fname: "Dev",
            lname: "Session",
            role: 1,
            username: "Dev Session"
        };
            console.log("Dev session login at ", new Date());
        var token = loginModel.createToken(devSession);

        res.json({
          token: token,
          sessionData: devSession
        });
    }

	else if (req.body.username && req.body.password) {

        var username = req.body.username;
        var password = req.body.password;

        userModel.findDUID(username).then(duid => {
            
            // TODO validate LDAP first. Local validation occurs .then()
            loginModel.validateLdapBind(duid, password).then(ldapAuth => {

                if(ldapAuth === true) {
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

module.exports.userAdd = function(req, res) {
    var userID = req.body.userID, data = {};
        data['duid'] = req.body.duid,
        data['username'] = req.body.username || "",
        data['firstname'] = req.body.firstname,
        data['lastname'] = req.body.lastname,
        data['role'] = parseInt(req.body.role);

    // Check for existing user
    userModel.findUserByName(data.firstname, data.lastname).then(exists => {
        if(exists) {
            res.status(200);
            res.json({
                status: "error",
                message: "User exists",
                data: null
            });
        }
        else {
            // Add the user, and add the corresponding librarian record
            userModel.addUserData(data).then(response => {

                if(response != false) {
                    // Insert librarian recors
                    var librarianData = {
                        userID: response,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        isActive: true
                    }

                    librarianModel.addLibrarian(librarianData, function(response) {
                        res.status(200);
                        res.json({
                            status: "ok",
                            data: response
                        });
                    });
                }
                else {
                    res.status(200);
                    res.json({
                        status: "error",
                        message: "Could not add user data"
                    });
                }
                
            });
        }
    });
};

module.exports.userGet = function(req, res) {
    var userID = req.query.userID;
    userModel.getUserData(userID).then(response => {
        res.status(200);
        res.json({
            status: "ok",
            data: response
        });
    });
};

module.exports.userUpdate = function(req, res) {
    var userID = req.body.userID, data = {};
        data['duid'] = req.body.duid;
        data['username'] = req.body.username || "";
        data['firstname'] = req.body.firstname;
        data['lastname'] = req.body.lastname;
        data['role'] = parseInt(req.body.role);

    userModel.updateUserData(userID, data).then(response => {
        res.status(200);
        if(response) {
            res.json({
                status: "ok",
                data: response
            });
        }
        else {
            res.json({
                status: "error",
                message: "Could not update user data"
            });
        }
    });
};

module.exports.userRemove = function(req, res) {
    var userID = req.body.userID;
        console.log("Remuser id:", userID);
    userModel.removeUserData(userID).then(response => {
        librarianModel.setLibrarianInactive(userID, function(response) {
            res.status(200);
            res.json({
                status: response
            });
        });
    });
};



