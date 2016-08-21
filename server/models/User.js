'use strict'

exports.isValidSession = function() {
  var token = "12345";
  return validateSessionToken(token);
};

var validateSessionToken = function(token) {
  return token == "12345";
};