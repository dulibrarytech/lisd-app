'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');

// *** This will get data for both sections of the first page.
// data:  If librarianID is present, get data for that librarian.  If byMonth is true, will aggregate results by monts.
exports.getAllData = function(data, callback, done) {
	
	var allResults = [];
	var count = Object.keys(model).length;
	console.log(count);

	// Aggregate data from DB model functions (Async)
	// for(var key in model) {
	// 	model[key](data, callback, done);
	// }

	var appendDataToResponseObject = function(data) {
		// Loop keys of data object, adding each key and its data to the main results object
		for(var key in data) {

		}

		if(allResults.length >= count) {
			//callback(allresults,done);
		}
	};

	model.getTotalStudents(data, callback, done);
}

var model = {

	getTotalStudents : function(data, callback, done) {

		var resultObj = {};

		var query = 'SELECT SUM(undergraduates) AS underGraduates, SUM(graduates) AS graduates, SUM(faculty) AS faculty, SUM(other) AS other FROM tbl_lisd WHERE classDate >= "' + data.fromDate + '" AND classDate <= "' + data.toDate + '"';
		database.query(query, function (error, results, fields) {
		  
		  if(error) {
			console.log("Database error: " + error);
		  }
		  // TODO utilize resultObj
		  callback(results,done); // TODO test results for db error?  ex. what is returned with a db error, is it an array?  does it have empty object?  Test and move to getDepartmentTotals()
		});
	},

	getTotalStudentsByDepartment : function(data, callback, done) {
		callback([{deptTotals: '18'}],done);
	}

	// var getTotalStudentsByDepartment = function(data, callback, done) {

	// };
	// var getTotalClassesByDepartment = function(data, callback, done) {

	// };
	// var getTotalClassesByLocation = function(data, callback, done) {

	// };
	// var getTotalClassesByClassType = function(data, callback, done) {

	// };
}

