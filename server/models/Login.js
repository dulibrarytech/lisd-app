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
		if(settings.runtime_env == "development") {
			console.log("Dev mode skips LDAP: ", new Date());
			fulfill(true);
		}
		else {

			try { 
				// Validate LDAP via auth-service api
				var url = settings.LDAPAuthService;

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
				
				//return res.json({ success: false, message: 'Failed to authenticate token.' });    
				console.log("Validation error: Invalid token");
				return res.status(403).send();
			} else {

				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    

				// TODO refresh token, then re-store in header:
				// delete decoded.iat;
				// delete decoded.exp;
				//req.headers['x-access-token'] = createToken(decoded);

				next();
			}
		});

	} else {

		console.log("No token present"); // DEV
		return res.status(403).send();

	}

};
