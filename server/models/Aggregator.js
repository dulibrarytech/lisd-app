'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');



// exports.getAllData = function(data, callback, done) {

// }



/**
* TODO list data object members
* @param object data 	data object members:
*
* 	object callback		Function is called once the async data retrieval is complete.  resultSet object is passed into this function, for external processing.
* 	function done 		For testing purposes only (mocha-chai asynchronous testing)
*/
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
