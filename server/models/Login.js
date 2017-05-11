var settings = require("../config/settings");
var jwt = require("jsonwebtoken"); 

exports.createToken = function(userData) {

    return jwt.sign(userData, settings.secret, {
      expiresIn: 10000 
    });
};

exports.validateLdapBind = function(username, password) {

	return new Promise(function(fulfill, reject) {
		fulfill(true);
	});
};

exports.validateToken = function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, settings.secret, function(err, decoded) {      
			if (err) {
				
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {

				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});

	} else {

		console.log("No token present"); // DEV
		return res.status(403).send();

	}

};
