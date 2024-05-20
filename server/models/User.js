var database = require('../util/database.js');
var ObjectId = require('mongodb').ObjectId; 
var collection = {};

console.log("User model connecting to database..");
database.connect()
	.then((db) => {
		if(!db) throw "User database connection failed";
		else {
			console.log(`User model connected to database: ${db}`);
			collection = db.collection('lisd_user');
		}
	})
	.catch(console.error)
	.finally(() => {
		// if(database) database.closeConnection();
	});

exports.validateLisdUser = async function(username) {
	try {
		var cursor = await collection.find().toArray();
		for(let item of cursor) { 
			if(item != null) {
				if(item.username == username || item.duid == username) {

					var userObject = {
						userID: item._id,
						fname: item.firstname,
						lname: item.lastname,
						role: item.role,
						username: item.username
					};

					return userObject;
				}
			}
			else {
				return false;
			}
		};
	}
	catch (e) {
		console.log("Error: " + e);
		return false;
	}
};

exports.findDUID = async function(username) {
	// If numeric is used as username, assume it is DUID and use that
	if(isNaN(username) === false) {
		return username;
	}

	try {
		var cursor = await collection.find({"username": username}).toArray();
		for(let item of cursor) { // DEV convert to first [] index access

			if(item != null) {
				return item.duid;
			}
			else {
				return false;
			}
		};
	}
	catch (e) {
		console.log("Error: " + e);
		return false;
	}
};

exports.getAllUsers = async function() {
	var users = [];

	try {
		var users = await collection.find({}).toArray();
		return users;
	}
	catch (e) {
		console.log("Error: " + e);
		return false;
	}
};

exports.insertDuid = async function(duid, lastName) {
	try {
		await collection.updateOne({lastname:lastName}, {$set: {duid:duid}});
		console.log("User " + duid + " added");
		return duid;

	} catch (e) {
		console.log("Error: " + e);
		return false;
	};
};

exports.getUserData = async function(userID) {
	try {
		var data = await collection.findOne({ "_id": new ObjectId(userID) });
		return data;
	}
	catch (e) {
		console.log("Error: " + e);
		return false;
	}
};

exports.updateUserData = async function(userID, userData) {
	try {
		await collection.updateOne({"_id": new ObjectId(userID)}, {$set: userData});
		console.log("User " + userID + " updated");
		return true;

	} catch (e) {
		console.log("Error: " + e);
		return false;
	};
};

exports.addUserData = async function(userData) {
	try {
		let result = await collection.insertOne(userData);
		console.log("Added user " + result.insertedId.toString());
		return result.insertedId.toString();

	} catch (e) {
		console.log("Error: " + e);
		return false;
	};
};

exports.removeUserData = async function(userID) {
	try {
		await collection.deleteOne({ "_id": new ObjectId(userID)});
		console.log("User " + userID + " removed");
		return true;

	} catch (e) {
		console.log("Error: " + e);
		return false;
	};
};

exports.findUserByName = async function(firstName, lastName) {
	try {
		var user = await collection.findOne({ "firstname" : firstName, "lastname" : lastName });
		return user;
	}
	catch (e) {
		console.log("Error: " + e);
		return false;
	}
};



