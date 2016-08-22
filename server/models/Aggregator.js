'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');



/**
*
*
*/
exports.getTotalStudents = function(fromYear, toYear, listByMonth, librarianID) {
	
	var resultSet = {totalStudents: null};

	var fromDate = fromYear + '-' + settings.fiscalYearStart;
	var toDate = toYear + '-' + settings.fiscalYearEnd;

	// Undergraduates
	var query = 'SELECT SUM(undergraduates) FROM tbl_lisd WHERE classDate >= "' + fromDate + '" AND classDate <= "' + toDate + '"';
	database.query(query, function (error, results, fields) {
	  
	  if(error) {
		console.log("Database error: " + error);
	  }
	  else {
	  	var totalStudents = results[0]['SUM(undergraduates)'];
		if(results.length > 0 && typeof totalStudents == "number") {
			resultSet.totalStudents = totalStudents;
		}
	  }
	  console.log("1");
	});

	console.log("2");

	return resultSet;
}