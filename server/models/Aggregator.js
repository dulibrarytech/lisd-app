'use strict'

module.exports = (function() {

	// var database = require('../util/database.js');
	// database.connect();

	var getStudentTotals = function() {

	}

	var getDepartmentTotals = function() {
		
	}

	// ...

	var getAllData = function(data, callback) {

		// var db = database.connection();
		// var collection = db.collection('lisd_class');
		callback({data:"all2"});
	}

	var getClassData = function(data, callback) {

	}

	return {
		getAllData: function(data,callback) {
			getAllData(data,callback);
		},
		getClassData: function(data,callback) {
			getClassData(data,callback);
		}
	};
})()