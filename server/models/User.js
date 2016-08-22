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

var validateSessionToken = function(token) {
  return token == "12345";
};