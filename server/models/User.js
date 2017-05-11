var database = require('../util/database.js');
var settings = require("../config/settings");
var collection;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_user');
	// DEV
	console.log("User model connected to db...");
});

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
