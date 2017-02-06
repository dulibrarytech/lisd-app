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

	var getAllData = function(queryData, callback) {

		var results = [];
		var message;

		try {
			var cursor = classCollection.find( { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } } );  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		console.log(item.courseInfo.date);
	        		results.push(item);
	        	}
	        	else {
	        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        		callback({status: "ok", message: message, data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getStudentTotals = function() {

		var resultSet = {};
		var results = [];

		try {
			var cursor = classCollection.find( { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } } );  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {

	        		results.push(item);











	        		console.log(results);


	        	}
	        	else {
	        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        		callback({status: "ok", message: message, data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getClassTotals = function() {
		
	};

	return {
		getAllData: function(queryData,callback) {
			getAllData(queryData,callback);
		},
		getStudentTotals: function(queryData,callback) {
			getStudentTotals(queryData,callback);
		},
		getClassTotals: function(queryData,callback) {
			getClassTotals(queryData,callback);
		}
	};
})()