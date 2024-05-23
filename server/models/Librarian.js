'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	var collection = {};

	// TEST single connection in bootstrap
	// collection = database.connection().collection('lisd_librarian');

	console.log("Librarian model connecting to database..");
	database.connect()
		.then((db) => {
			if(!db) throw "Librarian database connection failed";
			else {
				console.log(`Librarian model connected to database: ${db}`);
				collection = db.collection('lisd_librarian');
			}
		})
		.catch(console.error)
		.finally(() => {
			// if(database) database.closeConnection();
		});
	
	var addLibrarian = async function(data, callback) {
		try {
			let result = await collection.insertOne(data);
			console.log("Added librarian ", result.insertedId.toString());
			callback(true);

		} catch (e) {
			console.log("Error: " + e);
			callback(false);
		};
	};

	var getList = async function(callback) {
		var results = {
			librarian: {}
		};
		
		try {
			var cursor = await collection.find({ "isActive": true }, {"_id": 1, "firstname": 1, "lastname": 1}).sort({ lastname: 1 }).toArray();

			for(let item of cursor) {
				var nameStr = item.lastname + ", " + item.firstname;
				results.librarian[item._id] = nameStr;
			}

			callback({status: "ok", message: "Ok", data: results});
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getAll = async function(callback) {
		var results = {
			librarian: {}
		};

		try {
			var cursor = await collection.find({}, {"_id": 1, "firstname": 1, "lastname": 1}).sort({ lastname: 1 }).toArray();

			for(let item of cursor) {
				var nameStr = item.lastname + ", " + item.firstname;
				results.librarian[item._id] = nameStr;
			}

			callback({status: "ok", message: "Ok", data: results});
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var findByUserID = async function(userID, callback) {
		var librarianID = "";
		var query = {};

		query["userID"] = userID.toString();

		try {
			let item = await collection.findOne(query);

			if(item != null) {
				librarianID = item._id;
			}
			else {
				console.log("Librarian not found");
			}
		}
		catch (e) {
			console.log("Error: " + e);
		}

		callback(librarianID);
	};

	var setLibrarianInactive = async function(userID, callback) {
		try {
			var librarianData = {
				"userID": "",
				"isActive": false
			}

			let response = await collection.updateOne({"userID": userID}, {$set: librarianData});
			callback(true);

		} catch (e) {
			console.log("Error: " + e);
			callback(false);
		};
	};

	return {
		addLibrarian: function(data, callback) {
			addLibrarian(data, callback);
		},
		getAll: function(callback) {
			getAll(callback);
		},
		setLibrarianInactive: function(userID, callback) {
			setLibrarianInactive(userID, callback);
		},
		getList: function(callback) {
			getList(callback);
		},
		findByUserID: function(userID, callback) {
			findByUserID(userID, callback);
		}
	};
})()