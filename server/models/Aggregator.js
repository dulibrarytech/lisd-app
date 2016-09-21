'use strict'

module.exports = (function() {

	// var database = require('../util/database.js');
	// database.connect();

	var getStudentTotals = function() {

	}

	var getDepartmentTotals = function() {
		
	}

	// ...

	var getAllData = function(data,callback) {

		// var db = database.connection();
		// var collection = db.collection('lisd_class');
		callback({data:"all"});
	}

	return {
		getAllData: function(data,callback) {
			getAllData(data,callback);
		}
	};
})()