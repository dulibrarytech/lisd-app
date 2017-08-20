

module.exports = (function() {

	var mongo = require('mongodb');
	var database = require('../util/database.js');
	var collection;

	database.connect(function(db) {
		//var db = database.connection();
		collection = db.collection('lisd_librarian');
		// DEV
		//console.log("Librarian model connected to db...");
	});
	
	var addLibrarian = function(data, callback) {

		try {
			// Insert the document
		    collection.insertOne(data, function(err, result) {
			    if(err) {
			    	console.log("Error: " + err);
			    	callback(false);
			    }
			    else {
			    	console.log("Added librarian ", result.ops[0]._id);
			    	callback(true);
			    }
			});
		} catch (e) {
			console.log("Error: " + e);
			callback(false);
		};
	};

	var getList = function(callback) {
		var results = {
			librarian: {}
		};
		
		try {
			var cursor = collection.find({ "isActive": true }, {"_id": 1, "firstname": 1, "lastname": 1}).sort({ lastname: 1 });
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		var nameStr = item.lastname + ", " + item.firstname;
	        		results.librarian[item._id] = nameStr;
	        	}
	        	else {
	        		callback({status: "ok", message: "Ok", data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var findByUserID = function(userID, callback) {
		var librarianID = "";
		var query = {};
		query["userID"] = userID.toString();
		try {
			var cursor = collection.findOne(query, function(err, item) {
		    	if(err) {
		    		console.log("Error: " + err);
		    		callback(librarianID);
		    	}
		    	if(item != null) {
		    		librarianID = item._id;
		    	}
		    	else {
		    		console.log("Librarian found");
		    	}
		    	callback(librarianID)
		    });
		}
		catch (e) {
			console.log("Error: " + e);
			callback(librarianID);
		}
	};

	var getAllLibrarians = function(callback) {
		try {
			var cursor = collection.find({}, {"_id": 1, "name": 1});
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		// results.librarian[item._id] = item.name;
	        		console.log("Found librarian item: ", item);
	        	}
	        	else {
	        		callback({status: "ok", message: "Ok", data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	return {
		addLibrarian: function(data, callback) {
			addLibrarian(data, callback);
		},
		getList: function(callback) {
			getList(callback);
		},
		findByUserID: function(userID, callback) {
			findByUserID(userID, callback);
		}
	};
})()