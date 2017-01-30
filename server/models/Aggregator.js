'use strict'

module.exports = (function() {

	// var database = require('../util/database.js');
	// database.connect();

	var database = require('../util/database.js');
	var classCollection, departmentCollection;

	database.connect(function(db) {
		//var db = database.connection();
		classCollection = db.collection('lisd_class');
		// DEV
		//console.log("Department model connected to db...");
	});

	var getStudentTotals = function() {

	}

	var getDepartmentTotals = function() {
		
	}

	// ...

	var getAllData = function(data, callback) {

		var resultSet = {};

		try {
			var cursor = classCollection.find( { "courseInfo.date": { $gte: new Date(data.fromDate), $lt: new Date(data.toDate) } } );  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {

	        		console.log(item.courseInfo.date);
	        	}
	        	else {
	        		console.log("NULL");
	        		// callback({status: "ok", message: "Ok", data: results});
	        		callback({data:"all2"})
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	}

	var getClassData = function(data, callback) {

	}

	return {
		getAllData: function(data,callback) {
			getAllData(data,callback);
		},
		getClassData: function(data,callback) {
			getClassData(data,callback);
		}
	};
})()