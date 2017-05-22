var settings = require("../config/settings");
var jwt = require("jsonwebtoken"); 
var request = require("request");

exports.createToken = function(userData) {

    return jwt.sign(userData, settings.secret, {
      expiresIn: 10000 
    });
};

exports.validateLdapBind = function(username, password) {

	return new Promise(function(fulfill, reject) {

		try { 
			console.log("LDAP username in " + username);
			// Validate LDAP via auth-service api
			var url = "https://lib-moon.du.edu/auth-service/index.php/api/v1/authenticate";

			var form = {
				"username": username,
				"password": password
			};
			var data = {
				"method": "POST", 
		        "rejectUnauthorized": false, 
		        "url": url,
		        "headers" : {"Content-Type": "application/json"},
		        "form": form
		    }; 

			request(data, function(err,httpResponse,body) {
    
				if(err) {
					console.log(err);
					fulfill(false);
				}
				else {
			    	var response = JSON.parse(body);
			    	fulfill(response.auth);
				}
			});
		}
		catch (err) {
			console.log(err);
			fulfill(false);
		}
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
