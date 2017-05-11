var database = require('../util/database.js');
var settings = require("../config/settings");
var collection;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_user');
	// DEV
	console.log("User model connected to db...");
});

// exports.isValidSession = function(session) {
//   return validateSessionToken(session.token);
// };

// exports.validateLogin = function(username, password) {

// 	// var isValid = false;

// 	// // validate ldap bind here

// 	// return validateLisdUser(username).then(isValid => {
// 	// 	console.log("VL receives:");
// 	// 	console.log(isValid);
// 	// 	return isValid;
// 	// });

// 	//return test; // returning the PROMISE.  Controller runs .then on this.  Update above code to use .then()
// };

exports.validateLisdUser = function(username) {

	return new Promise(function(fulfill, reject) {
		try {
			//var foundUser = false;
			var cursor = collection.find();
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		if(item.username == username) {

		        		console.log("each");
		        		console.log(item);
		        		


		        		// console.log(item.userName == );
		        		fulfill(item);
		        	}
	        	}
	        	else {
	        		reject(false);
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
