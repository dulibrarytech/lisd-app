'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');



/**
*
* @param object callback	Function is called once the async data retrieval is complete.  resultSet object is passed into this function, for external processing.
*/
exports.getTotalStudents = function(fromYear, toYear, listByMonth, librarianID, callback) {
	
	var resultSet = {};
	var returnData = callback;

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
	  	var resultData = {undergraduates: 0};
		if(results.length > 0 && typeof totalStudents == "number") {
			resultData.undergraduates = totalStudents;
			collectResults(resultData);
		}
	  }
	});

	// Graduates
	query = 'SELECT SUM(graduates) FROM tbl_lisd WHERE classDate >= "' + fromDate + '" AND classDate <= "' + toDate + '"';
	database.query(query, function (error, results, fields) {
	  
	  if(error) {
		console.log("Database error: " + error);
	  }
	  else {
	  	var totalStudents = results[0]['SUM(graduates)'];
	  	var resultData = {graduates: 0};
		if(results.length > 0 && typeof totalStudents == "number") {
			resultData.graduates = totalStudents;
			collectResults(resultData);
		}
	  }
	});

	var collectResults = function(resultData, callback) {
		
		var length = 0;
		for(var key in resultData) {
			resultSet[key] = resultData[key];
			length++;
		}

		if(Object.keys(resultSet).length == 2) {
			returnData(resultSet);
		}
	};
};
