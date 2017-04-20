
var LocalStrategy   = require('passport-local').Strategy;
var userModel       = require('../models/User');

// expose this function to our app using module.exports
module.exports = function(passport) {

    console.log("Init passport");

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("serialize");
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("deserialize");
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        console.log("Passport login");
        // Local auth
        userModel.validateLogin(username, null).then(response => {

            console.log("VL response");
            console.log(response);
            done(null, username);   
        });
        //done;
    }));

    passport.use('local-signup', new LocalStrategy({

        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {


    }));

};