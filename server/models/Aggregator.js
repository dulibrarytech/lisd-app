'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');

// *** This will get data for both sections of the first page.
// data:  If librarianID is present, get data for that librarian.  If byMonth is true, will aggregate results by monts.
exports.getAllData = function(data, callback, done) {
	
	var allResults = [];
	var maxLength = Object.keys(aggregatorModel).length;
}

// Aggregate data from DB model (Async)
// for(var key  in aggregatorModel) {
// 	//aggregatorModel[key](data, sendResponse);
// 	console.log(key);
// }

var appendDataToResponseObject = function(data) {
	// Loop keys of data object, adding each key and its data to the main results object
	for(var key in data) {

	}
}

// var sendResponse = function(results) {
// 	allResults.push(results);	// TODO add under separate keys for each function return
// 	//appendDataToResponseObject(results);
// 	if(allResults.length >= maxLength) {
// 		response.send(allResults);
// 		//done();
// 	}
// };

exports.getTotalStudents = function(data, callback, done) {

	var resultObj = {};

	var query = 'SELECT SUM(undergraduates) AS underGraduates, SUM(graduates) AS graduates, SUM(faculty) AS faculty, SUM(other) AS other FROM tbl_lisd WHERE classDate >= "' + data.fromDate + '" AND classDate <= "' + data.toDate + '"';
	database.query(query, function (error, results, fields) {
	  
	  if(error) {
		console.log("Database error: " + error);
	  }
	  // TODO utilize resultObj
	  callback(results,done); // TODO test results for db error?  ex. what is returned with a db error, is it an array?  does it have empty object?  Test and move to getDepartmentTotals()
	});
};

exports.getTotalStudentsByDepartment = function(data, callback, done) {
	callback({deptTotals: '18'},done);
};

// exports.getTotalStudentsByDepartment = function(data, callback, done) {

// };
// exports.getTotalClassesByDepartment = function(data, callback, done) {

// };
// exports.getTotalClassesByLocation = function(data, callback, done) {

// };
// exports.getTotalClassesByClassType = function(data, callback, done) {

// };

