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

	var monthlyTotals = {};
	monthlyTotals['january'] = {};
	monthlyTotals['february'] = {};
	monthlyTotals['march'] = {};
	monthlyTotals['april'] = {};
	monthlyTotals['may'] = {};
	monthlyTotals['june'] = {};
	monthlyTotals['july'] = {};
	monthlyTotals['august'] = {};
	monthlyTotals['september'] = {};
	monthlyTotals['october'] = {};
	monthlyTotals['november'] = {};
	monthlyTotals['december'] = {};

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

	var getStudentTotals = function(queryData, callback) {

		var resultSet = {};
		var results = [];
		var message;
		var courseObject;
		var date, month, quarter;

		var months = [];

		try {
			var cursor = classCollection.find( { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } } );  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.push(item);
	        	}
	        	else {

	        		// Yearly totals 
	        		var studentsByYear = {};
	        		studentsByYear['undergraduates'] = 0;
	        		studentsByYear['graduates'] = 0;
	        		studentsByYear['faculty'] = 0;
	        		studentsByYear['other'] = 0;
	        		for(var index in results) {
	        			courseObject = results[index];
	        			studentsByYear.undergraduates += courseObject.enrollmentInfo.undergraduates;
	        			studentsByYear.graduates += courseObject.enrollmentInfo.graduates;
	        			studentsByYear.faculty += courseObject.enrollmentInfo.faculty;
	        			studentsByYear.other += courseObject.enrollmentInfo.other;
	        		}

	        		// Monthly totals
	        		var studentsByMonth = {};
	        		for(var i=1; i<13; i++) {
	        			studentsByMonth[i] = {};
	        			studentsByMonth[i]['undergraduates'] = 0;
	        			studentsByMonth[i]['graduates'] = 0;
	        			studentsByMonth[i]['faculty'] = 0;
	        			studentsByMonth[i]['other'] = 0;
	        		}
	        		for(index in results) {
	        			courseObject = results[index];
	        			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11

	        			studentsByMonth[month].undergraduates += courseObject.enrollmentInfo.undergraduates;
	        			studentsByMonth[month].graduates += courseObject.enrollmentInfo.graduates;
	        			studentsByMonth[month].faculty += courseObject.enrollmentInfo.faculty;
	        			studentsByMonth[month].other += courseObject.enrollmentInfo.other;
	        		}

	        		// Sort by quarter
	        		var studentsByQuarter = {};
	        		for(var i=1; i<5; i++) {
	        			studentsByQuarter[i] = {};
	        			studentsByQuarter[i]['undergraduates'] = 0;
	        			studentsByQuarter[i]['graduates'] = 0;
	        			studentsByQuarter[i]['faculty'] = 0;
	        			studentsByQuarter[i]['other'] = 0;
	        		}
	        		for(index in results) {
	        			courseObject = results[index];
	        			quarter = courseObject.courseInfo.quarter;

	        			console.log("QUARTER: " + quarter);

	        			studentsByQuarter[quarter].undergraduates += courseObject.enrollmentInfo.undergraduates;
	        			studentsByQuarter[quarter].graduates += courseObject.enrollmentInfo.graduates;
	        			studentsByQuarter[quarter].faculty += courseObject.enrollmentInfo.faculty;
	        			studentsByQuarter[quarter].other += courseObject.enrollmentInfo.other;
	        		}

	        		resultSet['year'] = studentsByYear;
	        		resultSet['month'] = studentsByMonth;
	        		resultSet['quarter'] = studentsByQuarter;
	        		console.log(resultSet);

	        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        		callback({status: "ok", message: message, data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getClassTotals = function(queryData, callback) {
		
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