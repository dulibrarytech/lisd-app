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
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, settings.secret, function(err, decoded) {      
			if (err) {
				console.log("Validation error: Invalid token");
				return res.status(403).send();
			} else {
				req.decoded = decoded;    
				next();
			}
		});

	} else {
		console.log("No token present");
		return res.status(403).send();

	}
};

exports.validateTokenString = function(token="") {
	let data = false;

	try {
		data = jwt.verify(token, settings.secret);
	} catch(err) {
		console.log(err);
	}

	return data;
}
