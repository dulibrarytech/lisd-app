
var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var cfg = require("./config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};
var userModel = require('../models/User');

module.exports = function() {
    var strategy = new Strategy(params, function(userData, done) {







        //userModel.validateLogin(userData)
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};





// EX -- draft
app.post("/login", function(req, res) {  


    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        
        userModel.validateUser(username, password).then(response => {   // or use controller.authenticateLogin

            if (response === true) {

                // get user data to return to client

                // .then:
                var sessionData = {
                    userID: data.id,
                    fname:
                    lname:
                    timestamp:
                };
                var token = jwt.encode(sessionData, cfg.jwtSecret);
                res.json({
                    token: token  // OK
                });
            } else {
                res.sendStatus(401);
            }
        });

    } else {
        res.sendStatus(401);
    }
});