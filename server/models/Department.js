'use strict'

module.exports = (function() {

	var database = require('../util/database.js');
	var collection;

	database.connect(function(db) {
		//var db = database.connection();
		collection = db.collection('lisd_department');
		// DEV
		//console.log("Department model connected to db...");
	});
	
	var addDocument = function(data, callback) {

	};

	var getList = function(callback) {
		var results = {
			department: {}
		};

		try {
			var cursor = collection.find({ "isActive": true }, {"_id": 1, "name": 1}).sort({name:1});
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.department[item._id] = item.name;
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

	var getAll = function(callback) {
		// var results = {
		// 	location: {}
		// };

		// try {
		// 	var cursor = collection.find({ "isActive": true }, {"_id": 1, "name": 1}).sort({name:1});
	 //        cursor.each(function(err, item) {
	 //        	if(item != null) {
	 //        		results.location[item._id] = item.name;
	 //        	}
	 //        	else {
	 //        		callback({status: "ok", message: "Ok", data: results});
	 //        	}
	 //        });
		// }
		// catch (e) {
		// 	callback({status: "error", message: "Error: " + e});
		// }
		callback("HELLO2");
	}

	return {
		addDocument: function(doc,callback) {
			addDocument(doc,callback);
		},
		getList: function(callback) {
			getList(callback);
		},
		getAll: function(callback) {
			getAll(callback);
		}
	};
})()