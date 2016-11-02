'use strict'

var database = require('../util/database.js');
var collection;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_user');
	// DEV
	console.log("User model connected to db...");
});

/**
* Validates a session token
*
* @param Object session 	A session object containg a token string
* @return bool 	true if token is valid, false if it is invalid
*/
exports.isValidSession = function(session) {
  return validateSessionToken(session.token);
};

exports.validateLogin = function(username, password) {

	return validateLisdUser(username, password).then(function(isValid) {
		console.log("VL receives:");
		console.log(isValid);
	});

	//return test; // returning the PROMISE.  Controller runs .then on this.  Update above code to use .then()
};

var getNextID = function() {

};

var validateSessionToken = function(token) {

  	return token == "12345";
};

var validateLisdUser = function(username) {

	return new Promise(function(fulfill, reject) {
		try {
			//var foundUser = false;
			var cursor = collection.find();
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		if(item.userName == username) {

		        		console.log("each");
		        		//???????????
		        		// if not found, how to send false

		        		// console.log(item.userName == );
		        		fulfill(true);
		        	}
	        	}
	        	else {
	        		fulfill(false);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			reject(false);
		}
	});

	//return true;
};

var validateLdapBind = function(username, password) {

	// return new Promise(function(fulfill, reject) {
		
	// });

	// return true;
};




// const text = 
//   new Promise(function (resolve, reject) {
//     fs.readFile('tex.txt', function (err, text) {
//       if (err) 
//         reject(err);
//       else
//         resolve(text.toString());
//     })
//   })
//   .then(resolve)
//   .then(undefined, reject);