'use strict'

/**
* Validates a session token
*
* @param Object session 	A session object containg a token string
* @return bool 	true if token is valid, false if it is invalid
*/
exports.isValidSession = function(session) {
  return validateSessionToken(session.token);
};

exports.validateLogin = function(username, password, callback) {
	var auth = false;

	callback(auth);
}

var validateSessionToken = function(token) {
  return token == "12345";
};