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
	console.log("Something called VLU");
	return new Promise(function(fulfill, reject) {
		try {
			//var foundUser = false;
			var cursor = collection.find();
	        cursor.each(function(err, item) {
	        	console.log("VLU test");
	        	console.log(item);
	        	if(item != null) {
	        		if(item.username == username) {

		        		console.log("each");
		        		console.log(item);
		        		


		        		// console.log(item.userName == );
		        		fulfill(item);
		        	}
		        	else {
		        		console.log("username no match");
		        		//fulfill(false);
		        	}
	        	}
	        	else {
	        		console.log("No item");
	        		fulfill(false);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});

	//return true;
};
