var database = require('../util/database.js');
var settings = require("../config/settings");
var Librarian = require("./Librarian");
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

		        		var userObject = {
		        			userID: item._id,
		        			fname: item.firstname,
		        			lname: item.lastname,
		        			role: item.role,
		        			username: item.username
		        		};
		        		fulfill(userObject);
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
