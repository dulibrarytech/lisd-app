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
		var queryObj;
		var message;

		// If a librarian ID is present in the query, restrict results to those that contain that librarian ID
		if(queryData.librarianID != "") {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) }, "associatedLibrarians":  { $in: [queryData.librarianID] } };
		}
		else {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } };
		}

		try {
			console.log(queryData.librarianID);
			var cursor = classCollection.find(queryObj);  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.push(item);
	        	}
	        	else {

	        		if(results.length == 0) {
	        			callback({status: "ok", message: "No results found", data: null});
	        		}
	        		else {
	        			// department, location, type
		        		if(queryData.display == "Department") {

		        			resultSet['year'] = subsortStudentResultsByYear(results, 'department');
		        			resultSet['month']  = subsortStudentResultsByMonth(results, 'department');
		        			resultSet['quarter']  = subsortStudentResultsByQuarter(results, 'department');
		        		}
		        		else if(queryData.display == "Location") {

		        			resultSet['year'] = subsortStudentResultsByYear(results, 'location');
		        			resultSet['month']  = subsortStudentResultsByMonth(results, 'location');
		        			resultSet['quarter']  = subsortStudentResultsByQuarter(results, 'location');
		        		}
		        		else if(queryData.display == "Type") {

		        			resultSet['year'] = subsortStudentResultsByYear(results, 'type');
		        			resultSet['month']  = subsortStudentResultsByMonth(results, 'type');
		        			resultSet['quarter']  = subsortStudentResultsByQuarter(results, 'type');
		        		}
		        		else if(queryData.display == "ACRL Framework") {

		        			resultSet['year'] = subsortStudentResultsByYear(results, 'acrlFrame');
		        			resultSet['month']  = subsortStudentResultsByMonth(results, 'acrlFrame');
		        			resultSet['quarter']  = subsortStudentResultsByQuarter(results, 'acrlFrame');
		        		}
		        		else { // All
		        			resultSet['year'] = sortStudentResultsByAllYear(results);
		        			resultSet['month'] = sortStudentResultsByAllMonth(results);
		        			resultSet['quarter'] = sortStudentResultsByAllQuarter(results);
		        		}

		        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        			callback({status: "ok", message: message, data: resultSet});
	        		}
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	// Has display options All, Department, Location, Type
	var getClassTotals = function(queryData, callback) {

		var resultSet = {};
		var results = [];
		var queryObj;
		var message;

		// If a librarian ID is present in the query, restrict results to those that contain that librarian ID
		if(queryData.librarianID != "") {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) }, "associatedLibrarians":  { $in: [queryData.librarianID] } };
		}
		else {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } };
		}

		try {
			var cursor = classCollection.find(queryObj);  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.push(item);
	        	}
	        	else {

	        		// department, location, type
	        		if(queryData.display == "Department") {

	        			resultSet['year'] = subsortClassResultsByYear(results, 'department');
	        			resultSet['month']  = subsortClassResultsByMonth(results, 'department');
	        			resultSet['quarter']  = subsortClassResultsByQuarter(results, 'department');
	        		}
	        		else if(queryData.display == "Location") {

	        			resultSet['year'] = subsortClassResultsByYear(results, 'location');
	        			resultSet['month']  = subsortClassResultsByMonth(results, 'location');
	        			resultSet['quarter']  = subsortClassResultsByQuarter(results, 'location');
	        		}
	        		else if(queryData.display == "Type") {

	        			resultSet['year'] = subsortClassResultsByYear(results, 'type');
	        			resultSet['month']  = subsortClassResultsByMonth(results, 'type');
	        			resultSet['quarter']  = subsortClassResultsByQuarter(results, 'type');
	        		}
	        		else if(queryData.display == "ACRL Framework") {

	        			resultSet['year'] = subsortClassResultsByYear(results, 'acrlFrame');
	        			resultSet['month']  = subsortClassResultsByMonth(results, 'acrlFrame');
	        			resultSet['quarter']  = subsortClassResultsByQuarter(results, 'acrlFrame');
	        		}
	        		else { // All
	        			resultSet['year'] = sortClassResultsByAllYear(results);
	        			resultSet['month'] = sortClassResultsByAllMonth(results);
	        			resultSet['quarter'] = sortClassResultsByAllQuarter(results);
	        		}

	        		//console.log(resultSet); // DEV
	        		if(results.length == 0) {message = "No results found";} else {message = "Returning all data";}
	        		callback({status: "ok", message: message, data: resultSet});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var getClassData = function(queryData, callback) {
		var resultSet = [];
		var results = [];
		var queryObj;
		var message;

		// If a librarian ID is present in the query, restrict results to those that contain that librarian ID
		if(queryData.librarianID != "") {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) }, "associatedLibrarians":  { $in: [queryData.librarianID] } };
		}
		else {
			queryObj = { "courseInfo.date": { $gte: new Date(queryData.fromDate), $lt: new Date(queryData.toDate) } };
		}

		try {
			var cursor = classCollection.find(queryObj);  // fromDate inclusive
	        cursor.each(function(err, item) {
	        	if(item != null) {
	        		results.push(item);
	        	}
	        	else {
	        		if(results.length == 0) {message = "No results found";} else {message = "Returning class data";}
	        		callback({status: "ok", message: message, data: results});
	        	}
	        });
		}
		catch (e) {
			callback({status: "error", message: "Error: " + e});
		}
	};

	var sortStudentResultsByAllYear = function(resultArray) {

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

		return {
			data: studentsByYear,
			totals: null
		}
	}

	var sortStudentResultsByAllMonth = function(resultArray) {

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

		return {
			data: studentsByMonth,
			totals: null
		}
	};

	var sortStudentResultsByAllQuarter = function(resultArray) {

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

		return {
			data: studentsByQuarter,
			totals: null
		}
	};

	// subsortResultsByYear(resultArray, subsort field)
	// Subsorts: 'department' 'location' 'type'
	var subsortStudentResultsByYear = function(resultArray, subsortField) {

		var courseObject, subField, subFieldArr;
		var studentsByYear = {};

		for(var index in resultArray) {
			courseObject = resultArray[index];
			subFieldArr = courseObject[subsortField]; // this will always be an array

			// If there are >1 subfields, add this courses student counts to the total for each field.  
			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				// Init the object if it does not yet exist
				if(typeof studentsByYear[subField] == "undefined") {
					studentsByYear[subField] = {
						undergraduates: 0,
						graduates: 0,
						faculty: 0,
						other: 0
					}
				}

				studentsByYear[subField].undergraduates += courseObject.enrollmentInfo.undergraduates;
				studentsByYear[subField].graduates += courseObject.enrollmentInfo.graduates;
				studentsByYear[subField].faculty += courseObject.enrollmentInfo.faculty;
				studentsByYear[subField].other += courseObject.enrollmentInfo.other;
			}
		}

		return {
			data: studentsByYear,
			totals: null
		}
	};

	var subsortStudentResultsByMonth = function(resultArray, subsortField) {

		var courseObject, month, subField, subFieldArr;
		var studentsByDepartmentMonth = {};

		for(var i=1; i<13; i++) {
			studentsByDepartmentMonth[i] = {};
		}

		for(var index in resultArray) {
			courseObject = resultArray[index];
			subFieldArr = courseObject[subsortField];
			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11

			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				if(typeof studentsByDepartmentMonth[month][subField] == 'undefined') {
					studentsByDepartmentMonth[month][subField] = {
						undergraduates: courseObject.enrollmentInfo.undergraduates,
						graduates: courseObject.enrollmentInfo.graduates,
						faculty: courseObject.enrollmentInfo.faculty,
						other: courseObject.enrollmentInfo.other
					}
				}
				else {
					studentsByDepartmentMonth[month][subField].undergraduates += courseObject.enrollmentInfo.undergraduates;
					studentsByDepartmentMonth[month][subField].graduates += courseObject.enrollmentInfo.graduates;
					studentsByDepartmentMonth[month][subField].faculty += courseObject.enrollmentInfo.faculty;
					studentsByDepartmentMonth[month][subField].other += courseObject.enrollmentInfo.other;
				}
			}
		}

		return {
			data: studentsByDepartmentMonth,
			totals: null
		}
	};

	var subsortStudentResultsByQuarter = function(resultArray, subsortField) {

		var courseObject, quarter, subField, subFieldArr;
		var studentsByDepartmentQuarter = {};

		for(var i=1; i<5; i++) {
			studentsByDepartmentQuarter[i] = {};
		}

		for(var index in resultArray) {
			courseObject = resultArray[index];
			subFieldArr = courseObject[subsortField];
			quarter = courseObject.courseInfo.quarter;

			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				if(typeof studentsByDepartmentQuarter[quarter][subField] == 'undefined') {
					studentsByDepartmentQuarter[quarter][subField] = {
						undergraduates: courseObject.enrollmentInfo.undergraduates,
						graduates: courseObject.enrollmentInfo.graduates,
						faculty: courseObject.enrollmentInfo.faculty,
						other: courseObject.enrollmentInfo.other
					}
				}
				else {
					studentsByDepartmentQuarter[quarter][subField].undergraduates += courseObject.enrollmentInfo.undergraduates;
					studentsByDepartmentQuarter[quarter][subField].graduates += courseObject.enrollmentInfo.graduates;
					studentsByDepartmentQuarter[quarter][subField].faculty += courseObject.enrollmentInfo.faculty;
					studentsByDepartmentQuarter[quarter][subField].other += courseObject.enrollmentInfo.other;
				}
			}
		}

		return {
			data: studentsByDepartmentQuarter,
			totals: null
		}
	};

	var sortClassResultsByAllYear = function(resultArray) {
		var classesByYear = {
			total: 0
		};

		// Just count the classes
		for(var index in resultArray) {
			classesByYear.total++;
		}

		return {
			data: classesByYear,
			totals: null
		}
	}

	var sortClassResultsByAllMonth = function(resultArray) {
		var classesByMonth = {};
		var courseObject, month;

		for(var i=1; i<13; i++) {
			classesByMonth[i] = 0;
		}

		// Increment the month counts
		for(var index in resultArray) {
			courseObject = resultArray[index];
			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11
			classesByMonth[month]++;
		}

		return {
			data: classesByMonth,
			totals: null
		}
	}

	var sortClassResultsByAllQuarter = function(resultArray) {
		var classesByQuarter = {};
		var courseObject, quarter;

		for(var i=1; i<5; i++) {
			classesByQuarter[i] = 0;
		}

		// Increment the month counts
		for(var index in resultArray) {
			courseObject = resultArray[index];
			quarter = courseObject.courseInfo.quarter;
			classesByQuarter[quarter]++;
		}

		return {
			data: classesByQuarter,
			totals: null
		}
	}

	var subsortClassResultsByYear = function(resultArray, subsortField) {

		var courseObject, subField, subFieldArr;
		var classesByYear = {};

		for(var index in resultArray) {
			courseObject = resultArray[index];
			subFieldArr = courseObject[subsortField];

			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				if(typeof classesByYear[subField] == "undefined") {
					classesByYear[subField] = 1;
				}
				else {
					classesByYear[subField]++;
				}
			}
		}

		return {
			data: classesByYear,
			totals: null
		}
	};

	var subsortClassResultsByMonth = function(resultArray, subsortField) {

		var courseObject, subField, month, subFieldArr;
		var classesByMonth = {};

		for(var i=1; i<13; i++) {
			classesByMonth[i] = {};
		}

		for(var index in resultArray) {
			courseObject = resultArray[index];
			month = courseObject.courseInfo.date.getMonth() + 1; // getMonth months range 0-11
			subFieldArr = courseObject[subsortField];

			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				if(typeof classesByMonth[month][subField] == "undefined") {
					classesByMonth[month][subField] = 1;
				}
				else {
					classesByMonth[month][subField]++;
				}
			}
		}

		return {
			data: classesByMonth,
			totals: null
		}
	};

	var subsortClassResultsByQuarter = function(resultArray, subsortField) {
		var courseObject, subField, quarter, subFieldArr;
		var classesByQuarter = {};

		for(var i=1; i<5; i++) {
			classesByQuarter[i] = {};
		}

		for(var index in resultArray) {
			courseObject = resultArray[index];
			quarter = courseObject.courseInfo.quarter;
			subFieldArr = courseObject[subsortField];

			for(var i in subFieldArr) {
				subField = subFieldArr[i];

				if(typeof classesByQuarter[quarter][subField] == "undefined") {
					classesByQuarter[quarter][subField] = 1;
				}
				else {
					classesByQuarter[quarter][subField]++;
				}
			}
		}

		return {
			data: classesByQuarter,
			totals: null
		}
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
		},
		getClassData: function(queryData, callback) {
			getClassData(queryData, callback);
		}
	};
})()