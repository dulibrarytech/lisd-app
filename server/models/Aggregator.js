'use strict'

require('dotenv').config();
var settings = require("../config/settings.js");
var database = require('../lib/Database.js');

// *** This will get data for both sections of the first page.
// data:  If librarianID is present, get data for that librarian.  If byMonth is true, will aggregate results by monts.
exports.getAllData = function(data, callback, done) {
	
	var allResults = [];
	var queries = {
		totalStudentsQuery : 'SELECT SUM(undergraduates) AS underGraduates, SUM(graduates) AS graduates, SUM(faculty) AS faculty, SUM(other) AS other FROM tbl_lisd WHERE classDate >= "' + data.fromDate + '" AND classDate <= "' + data.toDate + '"'
	};

	// Build response object.  Send to controller once all data has been appended
	var appendDataToResponseObject = function(data) {
		// If data is a DB error, send the error response.

		for(var key in data) {
			allResults[key] = data[key];
		}

		// If all results are in the bucket, send it to the controller.
		if(allResults.length >= Object.keys(queries).length) {
			callback(allResults, done);
		}
	};

	for(var key in queries) {
		database.queryDB(queries[key], appendDataToResponseObject);
	}
}


