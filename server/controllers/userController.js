require('dotenv').config();
var settings = require("../config/settings.js");
var jwt    = require('jsonwebtoken');
//var authModule = require("../config/auth.js");
//var jwt = require("jwt-simple"); 
//var cfg = require("../config/config.js"); 
var userModel = require("../models/User");

module.exports.authenticateLogin = function(req, res) {

	if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        // TODO validate LDAP first. Local validation occurs .then()
        userModel.validateLdapBind(username, password).then(response => {

            if(response === true) {
                console.log("LDAP valid"); // dev
                userModel.validateLisdUser(username).then(response => {   // or use controller.authenticateLogin

                    if (response === true) {
                        console.log("Local Auth valid"); // dev

                        var data = {
                         id: 1,
                         firstname: "Jeff",
                         lastname: "Rynhart",
                         role: 1
                        }

                        var token = jwt.sign(user, app.get('superSecret'), {
                          expiresIn: 10000 
                        });

                        // return the information including token as JSON
                        res.json({
                          token: token,
                          sessionData: data
                        });

                    } else {

                        console.log("Local Auth Invalid"); // dev
                        res.status(402);
                        res.json({
                            token: null,  // Invalid credentials
                            sessionData: {}
                        });
                    }
                });
            }
            else {

                console.log("Auth Invalid"); // dev
                res.status(402);
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
