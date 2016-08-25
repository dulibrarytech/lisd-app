'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');

/**
*
* @param object callback	Function is called once the async data retrieval is complete.  resultSet object is passed into this function, for external processing.
* @param function done 		For testing purposes only (mocha-chai asynchronous testing)
*/
exports.getTotalStudents = function(fromYear, toYear, listByMonth, librarianID, callback, done) {
	
	var returnData = callback;

	var fromDate = fromYear + '-' + settings.fiscalYearStart;
	var toDate = toYear + '-' + settings.fiscalYearEnd;

	var query = 'SELECT SUM(undergraduates) AS underGraduates, SUM(graduates) AS graduates, SUM(faculty) AS faculty, SUM(other) AS other FROM tbl_lisd WHERE classDate >= "' + fromDate + '" AND classDate <= "' + toDate + '"';
	database.query(query, function (error, results, fields) {
	  
	  if(error) {
		console.log("Database error: " + error);
	  }
	  callback(results,done); // TODO test results for db error?  ex. what is returned with a db error, is it an array?  does it have empty object?  Test and move to getDepartmentTotals()
	});
};

exports.getDepartmentTotals = function() {

};
