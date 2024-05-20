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
		console.log("TEST User::validateLisdUser(): cursor:", cursor)
		for(let item of cursor) { // DEV keep as is, cursor[0] must be the item
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
				// else {
				// 	return false; // unused?
				// }
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

	//return new Promise(function(fulfill, reject) {

		// If numeric is used as username, assume it is DUID and use that
		if(isNaN(username) === false) {
			return username;
		}

		try {
			var cursor = await collection.find({"username": username}).toArray();
			console.log("TEST User::findDUID() cursor returned:", cursor)
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
	//});
};

exports.getAllUsers = async function() {

	//return new Promise(function(fulfill, reject) {

		var users = [];

		try {
			var users = await collection.find({}).toArray();
			console.log("TEST User::getAllUsers() users returned:", users)

			return users;
	        // for(let item of cursor) {

	        // 	if(item != null) {
	        // 		users.push(item);
	        // 	}
	        // 	else {
	        // 		return users;
	        // 	}
	        // };
		}
		catch (e) {
			console.log("Error: " + e);
			return false;
		}
	//});
};

exports.insertDuid = async function(duid, lastName) {
	console.log("TEST User::insertDuid(): duid/lastname:", duid, lastname)
	//return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    await collection.updateOne({lastname:lastName}, {$set: {duid:duid}});
			    //if(err) {
			    	//console.log("Error: " + err);
			    	//return false;
			    //}
			    //else {
					console.log("User " + duid + " added");
			    	return duid;
			    //}
			//});
		} catch (e) {
			console.log("Error: " + e);
			return false;
		};
	//});
};

exports.getUserData = async function(userID) {

	//return new Promise(function(fulfill, reject) {

		var userData = {};
		try {
			var cursor = await collection.find({ "_id": new ObjectId(userID) }).toArray();
			console.log("TEST User::getUserData() cursor returned:", cursor)
	        for(let item of cursor) { // DEV convert to first [] index access
	        	// if(item != null) {
	        	// 	userData = item;
	        	// }
	        	// else {
	        		return item; // DEV
	        	// }
	        };
		}
		catch (e) {
			console.log("Error: " + e);
			return false;
		}
	//});
};

exports.updateUserData = async function(userID, userData) {
	console.log("TEST User::updateUserData()")
	//return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    await collection.updateOne({"_id": new ObjectId(userID)}, {$set: userData});
			    // if(err) {
			    // 	console.log("Error: " + err);
			    // 	return false;
			    // }
			    // else {
			    	console.log("User " + userID + " updated");
			    	return true;
			//     }
			// });
		} catch (e) {
			console.log("Error: " + e);
			return false;
		};
	//});
};

exports.addUserData = async function(userData) {
	console.log("TEST User::addUserData()")
	//return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    let result = await collection.insertOne(userData);
			console.log("TEST result:", result)
			    // if(err) {
			    // 	console.log("Error: " + err);
			    // 	return false;
			    // }
			    // else {
			    	console.log("Added user " + result.insertedId.toString());
			    	return result.insertedId.toString();
			//     }
			// });
		} catch (e) {
			console.log("Error: " + e);
			return false;
		};
	//});
};

exports.removeUserData = async function(userID) {
	console.log("TEST User::removeUserData()")
	//return new Promise(function(fulfill, reject) {
		try {
			// Insert the document
		    await collection.deleteOne({ "_id": new ObjectId(userID)});
			    // if(err) {
			    // 	console.log("Error: " + err);
			    // 	return false;
			    // }
			    // else {
			    	console.log("User " + userID + " removed");
			    	return true;
			//     }
			// });
		} catch (e) {
			console.log("Error: " + e);
			return false;
		};
	//});
};

exports.findUserByName = async function(firstName, lastName) {
	//return new Promise(function(fulfill, reject) {
		
		try {
			var cursor = await collection.find({ "firstname" : firstName, "lastname" : lastName }).toArray();
			console.log("TEST User::findUserByName() cursor returned:", cursor)
	        for(let item of cursor) { // DEV convert to first [] index access
	        	if(item != null) {
	        		console.log("User exists");
	        		return true;
	        		//return false;
	        	}
	        	else {
	        		console.log("User does not exist");
	        		return false;
	        	}
	        };
		}
		catch (e) {
			console.log("Error: " + e);
			return false;
		}
	//});
};



