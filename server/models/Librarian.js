'use strict'

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

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getList: function(callback) {
			getList(callback);
		}
	};
})()