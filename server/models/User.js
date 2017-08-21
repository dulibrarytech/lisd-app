var database = require('../util/database.js');
var settings = require("../config/settings");
var encryptor = require('simple-encryptor')(settings.cryptKey);

var ObjectId = require('mongodb').ObjectID;
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
	        		if(item.username == username || item.duid == username) {

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
		        		//fulfill(false);
		        	}
	        	}
	        	else {
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

		// If numeric is used as username, assume it is DUID and use that
		if(isNaN(username) === false) {
			fulfill(username);
		}

		try {
			var cursor = collection.find({"username": username});
	        cursor.each(function(err, item) {

	        	if(item != null) {
	        		fulfill(item.duid);
	        	}
	        	else {
	        		fulfill(false);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});
};

exports.getAllUsers = function() {

	return new Promise(function(fulfill, reject) {

		var users = [];

		try {
			var cursor = collection.find({});
	        cursor.each(function(err, item) {

	        	if(item != null) {
	        		users.push(item);
	        	}
	        	else {
	        		fulfill(users);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});
};

exports.insertDuid = function(duid, lastName) {

	return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    collection.updateOne({lastname:lastName}, {$set: {duid:duid}}, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	reject(false);
			    }
			    else {
			    	fulfill(duid)
			    }
			    // db.close();
			});
		} catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		};
	});
};

exports.getUserData = function(userID) {

	return new Promise(function(fulfill, reject) {

		var userData = {};
		try {
			var cursor = collection.find({ "_id": ObjectId(userID) });
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		userData = item;
	        	}
	        	else {
	        		fulfill(userData);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});
};

exports.updateUserData = function(userID, userData) {

	return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    collection.updateOne({"_id": ObjectId(userID)}, {$set: userData}, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	fulfill(false);
			    }
			    else {
			    	console.log("User " + userID + " updated");
			    	fulfill(true)
			    }
			});
		} catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		};
	});
};

exports.addUserData = function(userData) {

	console.log("Add data object:", userData);

	return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    collection.insertOne(userData, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	fulfill(false);
			    }
			    else {
			    	console.log("Added user " + result.ops[0]._id);
			    	fulfill(result.ops[0]._id.toString());
			    }
			});
		} catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		};
	});
};

exports.removeUserData = function(userID) {

	return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    collection.deleteOne({ "_id": ObjectId(userID)}, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	fulfill(false);
			    }
			    else {
			    	console.log("User " + userID + " removed " + result);
			    	fulfill(true);
			    }
			});
		} catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		};
	});
};

exports.findUserByName = function(firstName, lastName) {
	return new Promise(function(fulfill, reject) {

		try {
			var cursor = collection.find({ "firstname" : firstName, "lastname" : lastName });
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		console.log("User exists");
	        		fulfill(true);
	        		return false;
	        	}
	        	else {
	        		console.log("User does not exist");
	        		fulfill(false);
	        	}
	        });
		}
		catch (e) {
			console.log("Error: " + e);
			fulfill(false);
		}
	});
};



