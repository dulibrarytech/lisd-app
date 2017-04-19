
var LocalStrategy   = require('passport-local').Strategy;
var userModel       = require('../models/User');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({

        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() { // ?

            userModel.validateLogin(username, null).then(response => {

                if(response === true) {
                    // flash "user exists"
                }
                else {
                    userModel.addUser(userData, function(err, response) {
                        if(err) {
                            done(err);
                        }
                        else {
                            done(response);
                        }
                    });
                }
            });  
        });
    }));

};