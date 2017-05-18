var database = require('../util/database.js');
var settings = require("../config/settings");
var encryptor = require('simple-encryptor')(settings.cryptKey);
var Librarian = require("./Librarian");
var collection;

database.connect(function(db) {
	//var db = database.connection();
	collection = db.collection('lisd_user');
});

exports.validateLisdUser = function(username) {

	return new Promise(function(fulfill, reject) {
		try {
			//var foundUser = false;
			var cursor = collection.find();
	        cursor.each(function(err, item) {

	        	if(item != null) {
	        		if(item.username == username) {

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

exports.findDUID = function(username) {

	return new Promise(function(fulfill, reject) {

		try {
			var cursor = collection.find({"username": username});
	        cursor.each(function(err, item) {

	        	if(item != null) {
	        		console.log("Found user");
	        		console.log("DUID: " + item.duid);
	        		// var decrypted = encryptor.decrypt(item.duid);
	        		// fulfill(decrypted);
	        		// console.log("Decripted:");
	        		fulfill(item.duid);
	        	}
	        	else {
	        		console.log("No item found");
	        		fulfill(false);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});
}
