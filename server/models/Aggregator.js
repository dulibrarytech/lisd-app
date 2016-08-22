'use strict'

require('dotenv').config();
//var settings = require("./config/settings.js");
var database = require('../lib/Database.js');

/**
*
*
*/
exports.getTotalStudents = function(from, to, listByMonth, librarianID) {
	
	var resultSet = {};
	database.query('SELECT SUM(undergraduates) FROM tbl_lisd WHERE classDate >= "2015-07-01" AND classDate <= "2016-06-30"', function (error, results, fields) {
	  
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