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

	// Has display options All, Department
	var getStudentTotals = function(queryData, callback) {

		var resultSet = {};
		var results = [];
		var message;

		// TODO Librarian sort: build query specifying the librarian here, pass that into find() below

		try {
			var cursor = classCollection.find( { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } } );  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.push(item);
	        	}
	        	else {

	        		if(queryData.display == "Department") {
	        			// resultSet['year'] = sortResultsByDepartmentYear(results, 'department');

	        			resultSet['year'] = sortResultsByDepartmentYear(results);
	        			resultSet['month']  = sortResultsByDepartmentMonth(results);
	        			// resultSet['quarter']  = sortResultsByDepartmentQuarter(results);
	        		}
	        		else { // All
	        			resultSet['year'] = sortResultsByAllYear(results);
	        			resultSet['month'] = sortResultsByAllMonth(results);
	        			resultSet['quarter'] = sortResultsByAllQuarter(results);
	        		}

	        		console.log(resultSet); // DEV
	        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        		callback({status: "ok", message: message, data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	// Has display options All, Department, Location, Type
	var getClassTotals = function(queryData, callback) {
		
	};

	var sortResultsByAllYear = function(resultArray) {

		var courseObject;
		var studentsByYear = {};

		studentsByYear['undergraduates'] = 0;
		studentsByYear['graduates'] = 0;
		studentsByYear['faculty'] = 0;
		studentsByYear['other'] = 0;

		for(var index in resultArray) {
			courseObject = resultArray[index];
			studentsByYear.undergraduates += courseObject.enrollmentInfo.undergraduates;
			studentsByYear.graduates += courseObject.enrollmentInfo.graduates;
			studentsByYear.faculty += courseObject.enrollmentInfo.faculty;
			studentsByYear.other += courseObject.enrollmentInfo.other;
		}

		return studentsByYear;
	}

	var sortResultsByAllMonth = function(resultArray) {

		var courseObject, month;
		var studentsByMonth = {};

		for(var i=1; i<13; i++) {

			studentsByMonth[i] = {};
			studentsByMonth[i]['undergraduates'] = 0;
			studentsByMonth[i]['graduates'] = 0;
			studentsByMonth[i]['faculty'] = 0;
			studentsByMonth[i]['other'] = 0;
		}
		for(var index in resultArray) {
			courseObject = resultArray[index];
			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11

			studentsByMonth[month].undergraduates += courseObject.enrollmentInfo.undergraduates;
			studentsByMonth[month].graduates += courseObject.enrollmentInfo.graduates;
			studentsByMonth[month].faculty += courseObject.enrollmentInfo.faculty;
			studentsByMonth[month].other += courseObject.enrollmentInfo.other;
		}

		return studentsByMonth;
	};

	var sortResultsByAllQuarter = function(resultArray) {

		var courseObject, quarter;
		var studentsByQuarter = {};

		for(var i=1; i<5; i++) {
			studentsByQuarter[i] = {};
			studentsByQuarter[i]['undergraduates'] = 0;
			studentsByQuarter[i]['graduates'] = 0;
			studentsByQuarter[i]['faculty'] = 0;
			studentsByQuarter[i]['other'] = 0;
		}
		for(var index in resultArray) {
			courseObject = resultArray[index];
			quarter = courseObject.courseInfo.quarter;

			studentsByQuarter[quarter].undergraduates += courseObject.enrollmentInfo.undergraduates;
			studentsByQuarter[quarter].graduates += courseObject.enrollmentInfo.graduates;
			studentsByQuarter[quarter].faculty += courseObject.enrollmentInfo.faculty;
			studentsByQuarter[quarter].other += courseObject.enrollmentInfo.other;
		}

		return studentsByQuarter;
	};

	// subsortResultsByYear(resultArray, subsort field)
	// Subsorts: 'department' 'location' 'type'
	var sortResultsByDepartmentYear = function(resultArray, subsortField) {

		var courseObject;
		var studentsByYear = {};

		for(var index in resultArray) {
			courseObject = resultArray[index];

			// If courseObject[subsort]

			// Init the object if it does not yet exist
			if(typeof studentsByYear[courseObject.department] == "undefined") {
				studentsByYear[courseObject.department] = {
					undergraduates: 0,
					graduates: 0,
					faculty: 0,
					other: 0
				}
			}

			studentsByYear[courseObject.department].undergraduates += courseObject.enrollmentInfo.undergraduates;
			studentsByYear[courseObject.department].graduates += courseObject.enrollmentInfo.graduates;
			studentsByYear[courseObject.department].faculty += courseObject.enrollmentInfo.faculty;
			studentsByYear[courseObject.department].other += courseObject.enrollmentInfo.other;
		}

		return studentsByYear;
	};

	var sortResultsByDepartmentMonth = function(resultArray) {

		var courseObject, month;
		var studentsByDepartmentMonth = {};

		for(var i=1; i<13; i++) {
			studentsByDepartmentMonth[i] = {};
		}

		for(var index in resultArray) {
			courseObject = resultArray[index];
			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11

			if(typeof studentsByDepartmentMonth[month][courseObject.department] == 'undefined') {
				studentsByDepartmentMonth[month][courseObject.department] = {
					undergraduates: courseObject.enrollmentInfo.undergraduates,
					graduates: courseObject.enrollmentInfo.graduates,
					faculty: courseObject.enrollmentInfo.faculty,
					other: courseObject.enrollmentInfo.other
				}
			}
			else {
				studentsByDepartmentMonth[month][courseObject.department].undergraduates += courseObject.enrollmentInfo.undergraduates;
				studentsByDepartmentMonth[month][courseObject.department].graduates += courseObject.enrollmentInfo.graduates;
				studentsByDepartmentMonth[month][courseObject.department].faculty += courseObject.enrollmentInfo.faculty;
				studentsByDepartmentMonth[month][courseObject.department].other += courseObject.enrollmentInfo.other;
			}
		}


			// Init the course subobject if not yet defined
			// if(typeof studentsByDepartmentMonth[month][courseObject.department] == 'undefined') {
			// 	studentsByDepartmentMonth[month][courseObject.department] = {};
			// }

			// // If not yet defined, init the count with the firse course's data.  If iut is, just append the data
			// if(typeof studentsByDepartmentMonth[month][courseObject.department].undergraduates == 'undefined') {
			// 	studentsByDepartmentMonth[month][courseObject.department]['undergraduates'] = courseObject.enrollmentInfo.undergraduates;
			// }
			// else {
			// 	studentsByDepartmentMonth[month][courseObject.department].undergraduates += courseObject.enrollmentInfo.undergraduates;
			// }
			// // If not yet defined, init the count with the firse course's data.  If iut is, just append the data
			// if(typeof studentsByDepartmentMonth[month][courseObject.department].graduates == 'undefined') {
			// 	studentsByDepartmentMonth[month][courseObject.department]['graduates'] = courseObject.enrollmentInfo.graduates;
			// }
			// else {
			// 	studentsByDepartmentMonth[month][courseObject.department].graduates += courseObject.enrollmentInfo.graduates;
			// }
			// // If not yet defined, init the count with the firse course's data.  If iut is, just append the data
			// if(typeof studentsByDepartmentMonth[month][courseObject.department].faculty == 'undefined') {
			// 	studentsByDepartmentMonth[month][courseObject.department]['faculty'] = courseObject.enrollmentInfo.faculty;
			// }
			// else {
			// 	studentsByDepartmentMonth[month][courseObject.department].faculty += courseObject.enrollmentInfo.faculty;
			// }
			// // If not yet defined, init the count with the firse course's data.  If iut is, just append the data
			// if(typeof studentsByDepartmentMonth[month][courseObject.department].other == 'undefined') {
			// 	studentsByDepartmentMonth[month][courseObject.department]['other'] = courseObject.enrollmentInfo.other;
			// }
			// else {
			// 	studentsByDepartmentMonth[month][courseObject.department].other += courseObject.enrollmentInfo.other;
			// }
		//}
		return studentsByDepartmentMonth;
	};

	var sortResultsByDepartmentQuarter = function(resultArray) {

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