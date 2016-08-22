'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');

/**
*
*
*/
exports.getTotalStudents = function(fromYear, toYear, listByMonth, librarianID) {
	
	var resultSet = {};

	var fromDate = fromYear + '-' + settings.fiscalYearStart;
	var toDate = toYear + '-' + settings.fiscalYearEnd;
	var query = 'SELECT SUM(undergraduates) FROM tbl_lisd WHERE classDate >= "' + fromDate + '" AND classDate <= "' + toDate + '"';
	database.query(query, function (error, results, fields) {
	  
	  if(error) {
		console.log("Database error: " + error);
	  }
	  else {
		if(results.length > 0) {
			// Gather student totals, build result set
			console.log(results);
		}
	  }
	});

	return resultSet;
}