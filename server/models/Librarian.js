

module.exports = (function() {

	var database = require('../util/database.js');
	var collection;

	database.connect(function(db) {
		//var db = database.connection();
		collection = db.collection('lisd_librarian');
		// DEV
		//console.log("Librarian model connected to db...");
	});
	
	var addDocument = function(data, callback) {

	};

	var getList = function(callback) {
		var results = {
			librarian: {}
		};
		
		try {
			var cursor = collection.find({}, {"_id": 1, "name": 1});
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.librarian[item._id] = item.name;
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
		var librarianID = 0;
		console.log("FindUserByID");
		try {
			var cursor = collection.find({"userID" : userID}, {"_id": 1});
		    cursor.each(function(err, item) {
		    	if(err) {
		    		console.log("Error: " + err);
		    		callback(librarianID);
		    	}
		    	if(item != null) {
		    		console.log("Found librarian for user, libID: " + item._id);
		    		librarianID = item._id;
		    	}
		    	else {
		    		callback(librarianID);
		    	}
		    });
		}
		catch (e) {
			console.log("Error: " + e);
			callback(librarianID);
		}
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getList: function(callback) {
			getList(callback);
		},
		findByUserID: function(userID, callback) {
			findByUserID(userID, callback);
		}
	};
})()